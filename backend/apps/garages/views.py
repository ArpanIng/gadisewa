import logging

from rest_framework import status, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from apps.tenants.models import Garage
from apps.tenants.viewsets import GarageGenericViewSet
from apps.users.permissions import IsASuperUser
from .models import Service, Vehicle, Appointment, WorkOrder
from .schemas import appointments_schema, garage_schema, service_schema, vehicle_schema
from .serializers import (
    GarageSerializer,
    ServiceSerializer,
    VehicleSerializer,
    AppointmentSerializer,
    WorkOrderSerializer,
)

logger = logging.getLogger(__name__)


@garage_schema
class GarageViewSet(viewsets.ModelViewSet):
    queryset = Garage.objects.all()
    serializer_class = GarageSerializer
    permission_classes = [IsASuperUser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["garage_type"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save(update_fields=["is_active"])
        return Response(status=status.HTTP_204_NO_CONTENT)


@service_schema
class ServiceViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ["name"]
    ordering_ffields = ["id", "name", "labor_rate"]

    def get_queryset(self):
        return Service.objects.filter(garage=self.garage).select_related("garage")

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)


@vehicle_schema
class VehicleViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    lookup_url_kwarg = "vehicle_id"
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["fuel_type"]
    search_fields = ["vrn_validator", "registration_number"]

    def get_queryset(self):
        return Vehicle.objects.filter(garage=self.garage).select_related("garage", "customer")

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)


@appointments_schema
class AppointmentViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    lookup_url_kwarg = "appointment_id"
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["status"]
    search_fields = ["vehicle__customer__first_name"]
    ordering_fields = ["scheduled_for"]

    def get_queryset(self):
        return (
            Appointment.objects.filter(garage=self.garage)
            .select_related("garage", "vehicle__customer", "mechanic")
            .prefetch_related("service_type")
        )

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)


class WorkOrderViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = WorkOrderSerializer
    lookup_url_kwarg = "work_order_id"
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["status"]
    search_fields = ["customer__first_name"]
    ordering_fields = ["id", "open_date", "close_date"]

    def get_queryset(self):
        return WorkOrder.objects.filter(garage=self.garage).select_related(
            "garage", "customer", "vehicle"
        )

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)
