from django.contrib.auth.backends import ModelBackend

from .models import CustomUser


class SubdomainAuthBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        if not request:
            return None

        garage = getattr(request, "garage", None)

        try:
            if garage is None:
                # Platform login
                user = CustomUser.objects.get(email=email, garage__isnull=True)
            else:
                # Garage login
                user = CustomUser.objects.get(email=email, garage=garage)
        except CustomUser.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user

        return None
