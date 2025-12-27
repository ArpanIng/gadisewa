import uuid
from decimal import Decimal

from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models

from apps.users.models import Customer, Employee
from shared.models import GarageMixin, TimeStampMixin, UserAuditMixin, GarageAwareModel


class Service(GarageMixin, TimeStampMixin, GarageAwareModel):
    """Model representing services provided by the garage."""

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    labor_rate = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["garage", "name"], name="unique_service_name_per_garage"
            ),
        ]

    def __str__(self):
        return self.name


class Vehicle(GarageMixin, TimeStampMixin, models.Model):
    """Model representing vehicles of a garage."""

    class FuelType(models.TextChoices):
        PETROL = "PETROL", "Petrol"
        DIESEL = "DIESEL", "Diesel"
        ELECTRIC = "ELECTRIC", "Electric"

    vrn_validator = RegexValidator(
        regex=r"^[A-Za-z]{1,2} \d{1,2} [A-Za-z]{1,2} \d{1,4}$",
        message="Enter a valid Nepalese Vehicle Registration Number, e.g., Ba 1 Pa 1234.",
    )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="vehicles")
    # TODO: Need to add regex
    registration_number = models.CharField(
        max_length=20,
        unique=True,
        help_text="Vehicle Registration Number (VRN) issued by Nepal's Department of Transport Management. Example: Ba 1 Pa 1234.",
    )
    make = models.CharField(max_length=50, help_text="Manufacturer or brand of the vehicle.")
    model = models.CharField(max_length=50, help_text="Model name of the vehicle.")
    year = models.PositiveSmallIntegerField(blank=True, null=True, help_text="Year of manufacture.")
    odometer_reading = models.PositiveIntegerField(default=0, help_text="Odometer reading in km.")
    fuel_type = models.CharField(max_length=20, choices=FuelType.choices)

    def __str__(self):
        return f"{self.get_display_name()} ({self.registration_number})"

    def get_display_name(self):
        """Return the full name of the vehicle including year, make, and model."""
        if self.year:
            return f"{self.year} {self.make} {self.model}"
        return f"{self.make} {self.model}"


class Appointment(GarageMixin, TimeStampMixin, models.Model):
    """Model representing appointments of a garage."""

    class AppointmentStatus(models.TextChoices):
        SCHEDULED = "scheduled", "Scheduled"
        IN_PROGRESS = "in_progress", "In Progress"
        CONFIRMED = "confirmed", "Confirmed"
        COMPLETED = "completed", "Completed"
        CANCELLED = "cancelled", "Cancelled"

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    mechanic = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True)
    service_type = models.ManyToManyField(
        Service,
        related_name="appointments",
    )
    appointment_date = models.DateTimeField()
    notes = models.TextField(blank=True, default="")
    status = models.CharField(
        max_length=20,
        choices=AppointmentStatus.choices,
        default=AppointmentStatus.SCHEDULED,
        db_index=True,
    )


class WorkOrder(GarageMixin, TimeStampMixin, GarageAwareModel):
    """Model representing service visits for a customer's vehicle."""

    class OrderStatus(models.TextChoices):
        OPEN = "open", "Open"
        CLOSED = "closed", "Closed"
        IN_PROGRESS = "in_progress", "In Progress"
        READY = "ready", "Ready for Pickup"

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    # appointment = models.OneToOneField(
    #     Appointment, on_delete=models.SET_NULL, null=True, blank=True
    # )
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.OPEN)
    remarks = models.TextField(max_length=1000, blank=True, default="")
    open_date = models.DateTimeField(auto_now_add=True)
    close_date = models.DateTimeField(null=True, blank=True)


# class Job(TimeStampMixin, models.Model):
#     """Model representing an individual task within a work order."""

#     class JobStatus(models.TextChoices):
#         PENDING = "pending", "Pending"
#         WORKING = "working", "Working"
#         COMPLETED = "completed", "Completed"

#     work_order = models.ForeignKey(WorkOrder, on_delete=models.CASCADE, related_name="jobs")
#     service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
#     technician = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True)
#     labor_hours = models.DecimalField(
#         max_digits=5, decimal_places=2, default=Decimal(0), validators=[MinValueValidator(0)]
#     )
#     notes = models.TextField(blank=True, default="")
#     status = models.CharField(max_length=20, choices=JobStatus.choices, default=JobStatus.PENDING)
