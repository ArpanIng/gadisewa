import logging

from rest_framework import mixins, viewsets
from rest_framework.generics import ListAPIView

logging = logging.getLogger(__name__)

from .models import Garage
from .serializers import GarageSerializer


class GarageViewSet(viewsets.ModelViewSet):
    queryset = Garage.objects.all()
    serializer_class = GarageSerializer
