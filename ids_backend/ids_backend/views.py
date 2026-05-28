from rest_framework.views import APIView
from rest_framework.response import Response


class HomeView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to the Lightweight Hybrid CNN and ConvNeXt-Tiny IDS for IoT Networks API"})

    def post(self, request):
        return Response({request.data})