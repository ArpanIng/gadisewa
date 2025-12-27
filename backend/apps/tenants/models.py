from django.db import models

from shared.models import TimeStampMixin


class Garage(TimeStampMixin):
    """Model representing a garage."""

    class GarageTypeChoices(models.TextChoices):
        AUTO_REPAIR = "auto-repair", "Auto Repair"
        BODY_SHOP = "body-shop", "Body Shop"
        MULTI_SERVICE = "multi-service", "Multi-Service"

    name = models.CharField(max_length=255, unique=True, db_index=True)
    subdomain = models.CharField(max_length=255, unique=True, db_index=True)
    registration_number = models.CharField(
        max_length=100, unique=True, help_text="Business registration number."
    )
    tax_pan_number = models.CharField(max_length=50, unique=True)
    garage_type = models.CharField(max_length=20, choices=GarageTypeChoices.choices)

    # Location & Contact fields
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20, unique=True)
    email_address = models.EmailField(unique=True)

    # Operating Details
    working_hours = models.JSONField(
        blank=True, null=True, help_text="Example: {'mon-fri': '9am-6pm', 'sat': '10am-4pm'}"
    )

    # Services & Specializations
    # services = models.ManyToManyField(Service, through='GarageService')

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
