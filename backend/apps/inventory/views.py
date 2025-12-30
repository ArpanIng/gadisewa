import logging

from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from apps.tenants.viewsets import GarageGenericViewSet
from apps.users.permissions import IsGarageAdmin
from .models import Category, Supplier, Part
from .schemas import category_schema, part_schema, supplier_schema
from .serializers import CategorySerializer, PartSerializer, SupplierSerializer

logger = logging.getLogger(__name__)


@category_schema
class CategoryViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["is_active"]
    search_fields = ["name"]
    ordering_fields = ["id", "name"]
    lookup_url_kwarg = "category_id"

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            permission_classes = [IsGarageAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return Category.objects.filter(garage=self.garage).select_related("garage")

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)


@supplier_schema
class SupplierViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = SupplierSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["is_active"]
    search_fields = ["name"]
    ordering_fields = ["id", "name"]
    lookup_url_kwarg = "supplier_id"

    def get_queryset(self):
        return Supplier.objects.filter(garage=self.garage).select_related("garage")

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            permission_classes = [IsGarageAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)


from rest_framework.permissions import AllowAny


@part_schema
class PartViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = PartSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name", "sku"]
    ordering_fields = ["id", "name", "purchase_price", "selling_price", "quantity"]
    lookup_url_kwarg = "part_id"
    permission_classes = [AllowAny]

    # def get_permissions(self):
    #     """
    #     Instantiates and returns the list of permissions that this view requires.
    #     """
    #     if self.action in ["create", "update", "partial_update", "destroy"]:
    #         permission_classes = [IsGarageAdmin]
    #     else:
    #         permission_classes = [IsAuthenticated]
    #     return [permission() for permission in permission_classes]

    def get_queryset(self):
        return Part.objects.filter(garage=self.garage).select_related(
            "garage", "category", "supplier"
        )

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)
