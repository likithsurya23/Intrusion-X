from django.db import models
from django.contrib.auth.models import User

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedbacks')
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)
    admin_reply = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Feedback from {self.user.username} - {self.subject}"

class LoginHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='login_history')
    username_attempted = models.CharField(max_length=255)
    ip_address = models.CharField(max_length=45, blank=True, null=True)
    device_os = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=50) # 'Success' or 'Failed'
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.username_attempted} - {self.status} at {self.timestamp}"
