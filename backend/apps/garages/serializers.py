from rest_framework import serializers
from django.utils import timezone

from apps.users.models import Customer, Employee
from apps.users.serializers import EmployeeReadSerializer, MinimalCustomerSerializer
from apps.tenants.models import Garage
from .models import Service, Vehicle, Appointment, WorkOrder


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "description", "labor_rate", "created_at", "updated_at"]

    def validate_name(self, value):
        """Check name is unique per garage."""

        garage = self.context.get("request").garage

        queryset = Service.objects.filter(garage=garage, name=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Service with this name already exists.")

        return value


class GarageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garage
        fields = [
            "id",
            "name",
            "subdomain",
            "registration_number",
            "tax_pan_number",
            "garage_type",
            "street_address",
            "city",
            "postal_code",
            "phone_number",
            "email_address",
            "working_hours",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["is_active"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["garage_type"] = instance.get_garage_type_display()
        return data


class VehicleSerializer(serializers.ModelSerializer):
    owner = MinimalCustomerSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.none(),
        source="owner",
        write_only=True,
    )

    class Meta:
        model = Vehicle
        fields = [
            "id",
            "registration_number",
            "make",
            "model",
            "year",
            "odometer_reading",
            "fuel_type",
            "image",
            "owner",
            "owner_id",
            "created_at",
            "updated_at",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        garage = self.context.get("request").garage

        self.fields["owner_id"].queryset = Customer.objects.filter(garage=garage)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["fuel_type"] = instance.get_fuel_type_display()
        return data


class MinimalVehicleSerializer(serializers.ModelSerializer):
    customer = MinimalCustomerSerializer(read_only=True)

    class Meta:
        model = Vehicle
        fields = ["id", "registration_number", "make", "customer"]


class AppointmentSerializer(serializers.ModelSerializer):
    customer = MinimalCustomerSerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.none(),
        source="customer",
        write_only=True,
    )
    vehicle = MinimalVehicleSerializer(read_only=True)
    vehicle_id = serializers.PrimaryKeyRelatedField(
        queryset=Vehicle.objects.none(),
        source="vehicle",
        write_only=True,
    )
    mechanic = EmployeeReadSerializer(read_only=True)
    mechanic_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.none(),
        source="mechanic",
        write_only=True,
        allow_null=True,
        required=False,
    )
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.none(),
        source="service",
        write_only=True,
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "appointment_date",
            "customer",
            "customer_id",
            "vehicle",
            "vehicle_id",
            "mechanic",
            "mechanic_id",
            "service",
            "service_id",
            "status",
            "notes",
            "created_at",
            "updated_at",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        garage = self.context.get("request").garage

        self.fields["customer_id"].queryset = Customer.objects.filter(garage=garage)
        self.fields["vehicle_id"].queryset = Vehicle.objects.filter(garage=garage)
        self.fields["mechanic_id"].queryset = Employee.objects.filter(
            garage=garage, role=Employee.EmployeeRoleChoices.TECHNICIAN
        )
        self.fields["service_id"].queryset = Service.objects.filter(garage=garage)

    def validate_appointment_date(self, value):
        """Check appointment date is in future date."""

        if value < timezone.now():
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        return value

    # def validate(self, attrs):
    # if vehicle and customer and vehicle.owner != customer:
    # raise serializers.ValidationError(
    #     'Vehicle does not belong to the selected customer.'
    # )
    #     request = self.context.get("request")
    #     garage = request.garage
    #     user = request.user

    #     vehicle = attrs.get("vehicle")
    #     mechanic = attrs.get("mechanic")
    #     appointment_date = attrs.get("appointment_date")

    #     attrs["user"] = user

    #     if vehicle.owner != user:
    #         raise serializers.ValidationError(
    #             "You can only book appointments for your own vehicle."
    #         )

    #     # prevent mechanic double booking
    #     if mechanic and appointment_date:
    #         overlapping = Appointment.objects.filter(
    #             mechanic=mechanic,
    #             appointment_date=appointment_date,
    #             garage=garage,
    #         )

    #         if self.instance:
    #             overlapping = overlapping.exclude(pk=self.instance.pk)

    #         if overlapping.exists:
    #             raise serializers.ValidationError("Mechanic is already booked for this time.")

    #     # prevent vehicle double booking
    #     vehicle_overlap = Appointment.objects.filter(
    #         vehicle=vehicle,
    #         appointment_date=appointment_date,
    #         garage=garage,
    #     )

    #     if self.instance:
    #         vehicle_overlap = vehicle_overlap.exclude(pk=self.instance.pk)

    #     if vehicle_overlap.exists():
    #         raise serializers.ValidationError(
    #             "This vehicle already has an appointment at this time."
    #         )
    #     return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["status"] = instance.get_status_display()
        return data


class WorkOrderSerializer(serializers.ModelSerializer):
    customer = MinimalCustomerSerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.none(),
        source="customer",
        write_only=True,
    )
    vehicle = MinimalVehicleSerializer(read_only=True)
    vehicle_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.none(),
        source="vehicle",
        write_only=True,
    )

    class Meta:
        model = WorkOrder
        fields = [
            "id",
            "customer",
            "customer_id",
            "vehicle",
            "vehicle_id",
            "status",
            "remarks",
            "created_at",
            "updated_at",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        garage = self.context.get("request").garage

        self.fields["customer_id"].queryset = Customer.objects.filter(garage=garage)
        self.fields["vehicle_id"].queryset = Vehicle.objects.filter(garage=garage)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["status"] = instance.get_status_display()
        return data
