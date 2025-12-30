from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models

from shared.models import GarageMixin, TimeStampMixin, GarageAwareModel
from shared.validators import nepali_phone_validator


class CustomUser(AbstractUser):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        max_length=150,
        validators=[username_validator],
        error_messages={
            "unique": "A user with that username already exists.",
        },
    )
    email = models.EmailField(db_index=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    # only garage specific user have this field value
    garage = models.ForeignKey(
        "tenants.Garage", on_delete=models.SET_NULL, null=True, blank=True, related_name="users"
    )

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        constraints = [
            # Unique per garage
            models.UniqueConstraint(
                fields=["username", "garage"], name="unique_username_per_garage"
            ),
            models.UniqueConstraint(fields=["email", "garage"], name="unique_email_per_garage"),
            # Unique system-wide when garage is NULL
            models.UniqueConstraint(
                fields=["username"],
                condition=models.Q(garage__isnull=True),
                name="unique_username_global",
            ),
            models.UniqueConstraint(
                fields=["email"],
                condition=models.Q(garage__isnull=True),
                name="unique_email_global",
            ),
        ]

    def __str__(self):
        scope = self.garage.subdomain if self.garage else "platform"
        return f"{self.email} ({scope})"


class Customer(GarageMixin, TimeStampMixin, GarageAwareModel):
    """Model representing customer of a garage."""

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, validators=[nepali_phone_validator])
    email = models.EmailField(null=True, blank=True)
    address = models.TextField(blank=True, default="")
    avatar = models.ImageField(upload_to="customer_profiles/", null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["garage", "phone_number"], name="unique_customer_phone_number_per_garage"
            ),
            models.UniqueConstraint(
                fields=["garage", "email"],
                condition=models.Q(email__isnull=False),
                name="unique_customer_email_per_garage",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name} ({self.email})"


class Employee(GarageMixin, TimeStampMixin, GarageAwareModel):
    """Model representing employee of a garage."""

    class EmployeeRoleChoices(models.TextChoices):
        TECHNICIAN = "TECH", "Technician"
        ADVISOR = "ADVISOR", "Service Advisor"
        ADMIN = "ADMIN", "Administrator"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="employee"
    )
    role = models.CharField(max_length=20, choices=EmployeeRoleChoices.choices)
    avatar = models.ImageField(upload_to="employee_profiles/", null=True, blank=True)

    class Meta:
        constraints = [
            # Prevent employee without garage
            models.CheckConstraint(
                check=models.Q(garage__isnull=False),
                name="employee_requires_garage",
            ),
        ]

    # def clean(self):
    #     if self.user.garage is None:
    #         raise ValidationError("Platform users cannot be employees")

    #     if self.user.garage_id != self.garage_id:
    #         raise ValidationError("Employee garage must match user garage")

    def __str__(self):
        return f"Employee: {self.user}"
