from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class PredictSerializer(serializers.Serializer):
    features = serializers.ListField(
        child=serializers.FloatField(),
        min_length=1
    )
class BatchPredictSerializer(serializers.Serializer):
    samples = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        )
    )

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        return token

from .models import LoginHistory

class LoginHistorySerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = LoginHistory
        fields = ['id', 'username_attempted', 'role', 'ip_address', 'device_os', 'status', 'timestamp']

    def get_role(self, obj):
        if obj.user:
            return 'admin' if obj.user.is_superuser else 'user'
        return 'unknown'

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('name', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        name = validated_data.pop('name', '')
        # Simple split for first and last name
        parts = name.split(' ', 1)
        first_name = parts[0]
        last_name = parts[1] if len(parts) > 1 else ''
        
        user = User.objects.create_user(
            username=validated_data['email'], # Use email as username
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name
        )
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Feedback
        fields = ['id', 'user', 'username', 'user_email', 'subject', 'message', 'created_at', 'is_resolved', 'admin_reply']
        read_only_fields = ['user', 'created_at', 'username', 'user_email']

