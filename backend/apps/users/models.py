from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

from shared.models import GarageMixin

nepali_phone_validator = RegexValidator(
    regex=r"^(\+?977)?9[78]\d{8}$",
    message="Enter a valid Nepali phone number.",
    # code='invalid_phone_number'
)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    garage = models.ForeignKey(
        "garages.Garage", on_delete=models.SET_NULL, null=True, blank=True, related_name="users"
    )

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self) -> str:
        return self.email


class Customer(GarageMixin):
    """Model representing customer of a garage."""

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, unique=True, validators=[nepali_phone_validator])
    email = models.EmailField(unique=True, null=True, blank=True)
    address = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["garage", "phone"], name="unique_customer_phone_per_garage"
            ),
            models.UniqueConstraint(
                fields=["garage", "email"],
                condition=models.Q(email__isnull=False),
                name="unique_customer_email_per_garage",
            ),
        ]


class Employee(models.Model):
    """Model representing employee of a garage."""

    ROLE_CHOICES = [
        ("TECH", "Technician"),
        ("ADVISOR", "Service Advisor"),
        ("ADMIN", "Administrator"),
    ]

    class AttendanceStatus(models.TextChoices):
        PRESENT = "present", "Present"
        ABSENT = "absent", "Absent"
        HALF_DAY = "half_day", "Half Day"
        ON_LEAVE = "on_leave", "On Leave"

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    # check_in = models.TimeField()
    # check_out = models.TimeField()
    # working_hours = models.CharField()
    # notes = models.TextField(blank=True, default='')
