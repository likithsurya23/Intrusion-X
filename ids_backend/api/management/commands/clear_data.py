from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import LoginHistory, Feedback

class Command(BaseCommand):
    help = 'Erases all login history, user feedbacks, and non-superuser accounts from the database.'

    def handle(self, *args, **options):
        # 1. Clear Login History
        login_history_count = LoginHistory.objects.count()
        LoginHistory.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Successfully deleted {login_history_count} login history records.'))

        # 2. Clear Feedback
        feedback_count = Feedback.objects.count()
        Feedback.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Successfully deleted {feedback_count} feedback records.'))

        # 3. Clear regular users (is_superuser=False)
        regular_users = User.objects.filter(is_superuser=False)
        regular_users_count = regular_users.count()
        
        # Collect usernames for logging
        usernames = list(regular_users.values_list('username', flat=True))
        regular_users.delete()
        
        self.stdout.write(self.style.SUCCESS(f'Successfully deleted {regular_users_count} regular users: {usernames}'))
        self.stdout.write(self.style.SUCCESS('Database cleanup completed successfully!'))
