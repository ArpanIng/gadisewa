from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register(r"garages", views.GarageViewSet, basename="garage")
router.register(r"services", views.ServiceViewSet, basename="services")
router.register(r"vehicles", views.VehicleViewSet, basename="vehicles")
router.register(r"appointments", views.AppointmentViewSet, basename="appointments")
router.register(r"work-orders", views.WorkOrderViewSet, basename="work-orders")

urlpatterns = router.urls
