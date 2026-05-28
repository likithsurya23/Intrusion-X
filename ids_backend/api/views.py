from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import torch
import numpy as np
import pandas as pd  
from datetime import datetime
from .serializers import PredictSerializer, BatchPredictSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from model.hybrid_model import model, scaler, label_encoder
from collections import Counter
import logging

logger = logging.getLogger(__name__)
model.eval()
torch.set_grad_enabled(False)

from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import LoginHistory
from .serializers import LoginHistorySerializer
from rest_framework.permissions import IsAdminUser

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        ip_address = request.META.get('REMOTE_ADDR', '')
        device_os = request.META.get('HTTP_USER_AGENT', '')
        username_attempted = request.data.get('email') or request.data.get('username') or 'Unknown'

        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.user
            LoginHistory.objects.create(
                user=user,
                username_attempted=user.username,
                ip_address=ip_address,
                device_os=device_os,
                status='Success'
            )
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except Exception as e:
            LoginHistory.objects.create(
                user=None,
                username_attempted=username_attempted,
                ip_address=ip_address,
                device_os=device_os,
                status='Failed'
            )
            raise e

class AdminLoginHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Exclude successful admin logins and failed attempts using 'admin'
        history = LoginHistory.objects.exclude(
            user__is_superuser=True
        ).exclude(
            username_attempted='admin'
        )[:100]
        serializer = LoginHistorySerializer(history, many=True)
        return Response(serializer.data)

from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        print(serializer.errors)   
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class PredictAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        logger.info("Received prediction request")
        serializer = PredictSerializer(data=request.data)

        if serializer.is_valid():
            features = np.array(serializer.validated_data["features"]).reshape(1, -1)
            
            # Silence warning by using feature names if available
            if hasattr(scaler, "feature_names_in_"):
                 features = pd.DataFrame(features, columns=scaler.feature_names_in_)
                 
            features = scaler.transform(features)

            X = torch.tensor(features, dtype=torch.float32).unsqueeze(1)

            with torch.no_grad():
                outputs = model(X)
                probs = torch.softmax(outputs, dim=1)
                pred_idx = torch.argmax(probs, dim=1).item()
                confidence = probs.max().item()

            label = label_encoder.inverse_transform([pred_idx])[0]

            return Response({
                "prediction": label,
                "confidence": round(confidence, 4)
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BatchPredictAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            logger.info("Received batch prediction request")
            # ---- CASE 1: FILE UPLOAD ----
            if "file" in request.FILES:
                csv_file = request.FILES["file"]

                if not csv_file.name.endswith(".csv"):
                    return Response(
                        {"error": "Unsupported file type. Only CSV files are allowed."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                df = pd.read_csv(csv_file)

                # Drop label column if present
                if df.shape[1] == 47:
                    df = df.iloc[:, :-1]

                if df.shape[1] != 46:
                    return Response(
                        {"error": f"Model expects 46 features per sample. Found {df.shape[1]} columns in CSV."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                samples = df.values.astype(np.float32)

            # ---- CASE 2: JSON INPUT ----
            else:
                serializer = BatchPredictSerializer(data=request.data)
                if not serializer.is_valid():
                    return Response({
                        "error": "Invalid JSON format",
                        "details": serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)

                samples_list = serializer.validated_data["samples"]
                samples = np.array(samples_list, dtype=np.float32)

                # Compatibility: drop 47th column if present in list
                if samples.ndim == 2 and samples.shape[1] == 47:
                    samples = samples[:, :-1]

                if samples.ndim != 2 or samples.shape[1] != 46:
                    return Response(
                        {"error": f"Model expects 46 features per sample. Your input has {samples.shape[1] if samples.ndim==2 else 'invalid dimensions'}."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        except Exception as e:
            return Response(
                {"error": f"Failed to process input: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ================= MODEL PIPELINE (COMMON) =================
        try:
            # Silence warning by using feature names if available
            if hasattr(scaler, "feature_names_in_"):
                 samples = pd.DataFrame(samples, columns=scaler.feature_names_in_)
                 
            samples = scaler.transform(samples)

            batch_size = 256
            all_probs = []

            for i in range(0, len(samples), batch_size):
                batch = samples[i:i + batch_size]
                batch_tensor = torch.tensor(batch, dtype=torch.float32).unsqueeze(1)

                with torch.no_grad():
                    outputs = model(batch_tensor)
                    probs = torch.softmax(outputs, dim=1)
                    all_probs.append(probs.cpu())

            probs = torch.cat(all_probs, dim=0)
            pred_idxs = torch.argmax(probs, dim=1).numpy()
            labels = label_encoder.inverse_transform(pred_idxs)

            # ================= TOP ATTACK SUMMARY =================
            counter = Counter(labels)
            total_samples = len(labels)
            normal_count = counter.get("Normal", 0)
            attack_count = total_samples - normal_count

            # Filter and sort attacks
            attack_counter = {k: v for k, v in counter.items() if k != "Normal"}
            sorted_attacks = sorted(
                attack_counter.items(),
                key=lambda x: x[1],
                reverse=True
            )

            TOP_N = 14
            top_attacks = sorted_attacks[:TOP_N]

            attack_stats = []
            for attack, count in top_attacks:
                attack_stats.append({
                    "attack": attack,
                    "count": count,
                    "percentage": round((count / total_samples) * 100, 2)
                })

            return Response({
                "status": "success",
                "total_samples": total_samples,
                "normal_count": normal_count,
                "attack_count": attack_count,
                "top_attacks": attack_stats
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"Internal prediction failure: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UserMeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "role": 'admin' if user.is_staff else 'user',
            "name": f"{user.first_name} {user.last_name}".strip() or user.username
        })

from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.permissions import IsAdminUser

class UserFeedbackAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        feedbacks = Feedback.objects.filter(user=request.user).order_by('-created_at')
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminFeedbackAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        feedbacks = Feedback.objects.all().order_by('-created_at')
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        try:
            feedback = Feedback.objects.get(pk=pk)
        except Feedback.DoesNotExist:
            return Response({"error": "Feedback not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = FeedbackSerializer(feedback, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

