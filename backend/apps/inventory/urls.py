from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register(r"categories", views.CategoryViewSet, basename="categories")
router.register(r"suppliers", views.SupplierViewSet, basename="suppliers")

inventory_router = routers.SimpleRouter()
inventory_router.register(r"parts", views.PartViewSet, basename="parts")

urlpatterns = [
    path("", include(router.urls)),
    path("inventory/", include(inventory_router.urls)),
]
