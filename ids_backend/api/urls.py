from django.urls import path
from .views import PredictAPIView, BatchPredictAPIView, CustomTokenObtainPairView, RegisterAPIView, UserMeAPIView, UserFeedbackAPIView, AdminFeedbackAPIView, AdminLoginHistoryAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/me/', UserMeAPIView.as_view(), name='user_me'),
    path("predict/", PredictAPIView.as_view(), name="predict"),
    path("batch-predict/", BatchPredictAPIView.as_view(), name="batch-predict"),
    path('feedback/', UserFeedbackAPIView.as_view(), name='user_feedback'),
    path('admin/feedback/', AdminFeedbackAPIView.as_view(), name='admin_feedback'),
    path('admin/feedback/<int:pk>/', AdminFeedbackAPIView.as_view(), name='admin_feedback_detail'),
    path('admin/login-history/', AdminLoginHistoryAPIView.as_view(), name='admin_login_history'),
]
