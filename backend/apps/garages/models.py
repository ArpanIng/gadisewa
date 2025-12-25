import uuid
from decimal import Decimal

from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models
from apps.users.models import Customer, Employee
from shared.models import GarageMixin, TimeStampMixin


class Service(GarageMixin):
    """Model representing services provided by the garage."""

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    labor_rate = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name


class Garage(models.Model):
    """Model representing a garage."""

    class GarageTypeChoices(models.TextChoices):
        AUTO_REPAIR = "auto-repair", "Auto Repair"
        BODY_SHOP = "body-shop", "Body Shop"
        MULTI_SERVICE = "multi-service", "Multi-Service"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True, db_index=True)
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# class GarageService(models.Model):
#     garage = models.ForeignKey(Garage, on_delete=models.CASCADE)
#     service = models.ForeignKey(Service, on_delete=models.CASCADE)

#     class Meta:
#         unique_together = ('garage', 'service')

# class Vehicle(models.Model):
#     class FuelType(models.TextChoices):
#         PETROL = "PETROL", "Petrol"
#         DIESEL = "DIESEL", "Diesel"
#         ELECTRIC = "ELECTRIC", "Electric"

#     vrn_validator = RegexValidator(
#         regex=r"^[A-Za-z]{1,2} \d{1,2} [A-Za-z]{1,2} \d{1,4}$",
#         message="Enter a valid Nepalese Vehicle Registration Number, e.g., Ba 1 Pa 1234.",
#     )

#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="vehicles")
#     # TODO: Need to add regex
#     registration_number = models.CharField(
#         max_length=20,
#         unique=True,
#         help_text="Vehicle Registration Number (VRN) issued by Nepal's Department of Transport Management. Example: Ba 1 Pa 1234.",
#     )
#     make = models.CharField(max_length=50, help_text="Manufacturer or brand of the vehicle.")
#     model = models.CharField(max_length=50, help_text="Model name of the vehicle.")
#     year = models.PositiveSmallIntegerField(blank=True, null=True, help_text="Year of manufacture.")
#     odometer_reading = models.PositiveIntegerField(default=0, help_text="Odometer reading in km.")
#     fuel_type = models.CharField(max_length=20, choices=FuelType.choices)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.registration_number


# class Appointment(models.Model):
#     class AppointmentStatus(models.TextChoices):
#         SCHEDULED = "scheduled", "Scheduled"
#         IN_PROGRESS = "in_progress", "In Progress"
#         CONFIRMED = "confirmed", "Confirmed"
#         COMPLETED = "completed", "Completed"
#         CANCELLED = "cancelled", "Cancelled"

#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="appointments")
#     vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
#     mechanic = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True)
#     # service_type =
#     scheduled_for = models.DateTimeField()
#     reason = models.TextField(blank=True, default="")
#     status = models.CharField(
#         max_length=20, choices=AppointmentStatus.choices, default=AppointmentStatus.SCHEDULED
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


# class WorkOrder(models.Model):
#     class OrderStatus(models.TextChoices):
#         OPEN = "open", "Open"
#         CLOSED = "Closed", "Closed"
#         IN_PROGRESS = "in_progress", "In Progress"
#         READY = "ready", "Ready for Pickup"

#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
#     appointment = models.OneToOneField(
#         Appointment, on_delete=models.SET_NULL, null=True, blank=True
#     )
#     status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.OPEN)
#     open_date = models.DateTimeField(auto_now_add=True)
#     close_date = models.DateTimeField(null=True, blank=True)


# class Job(models.Model):
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
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
