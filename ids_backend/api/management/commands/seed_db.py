from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Seeds the database with default admin and test users if they do not exist.'

    def handle(self, *args, **options):
        # 1. Create Admin User
        admin_email = 'likithsurya555@gmail.com'
        if not User.objects.filter(username=admin_email).exists() and not User.objects.filter(email=admin_email).exists():
            User.objects.create_superuser(
                username=admin_email,
                email=admin_email,
                password='Admin@123',
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created admin superuser: {admin_email}'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin superuser {admin_email} already exists.'))

        # 2. Create Regular Test User
        user_name = 'user'
        if not User.objects.filter(username=user_name).exists():
            User.objects.create_user(
                username=user_name,
                email='user@example.com',
                password='User@123',
                first_name='Test',
                last_name='User'
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created regular test user: {user_name}'))
        else:
            self.stdout.write(self.style.WARNING(f'Regular test user {user_name} already exists.'))
