"""
This view is not implemented in the application.
"""

import logging
from rest_framework import exceptions, viewsets

from apps.tenants.models import Garage
from apps.users.models import CustomUser

logger = logging.getLogger(__name__)


class GarageNestedViewSet(viewsets.GenericViewSet):
    def initial(self, request, *args, **kwargs):
        # check that user is logged in
        if not request.user or not request.user.is_authenticated:
            raise exceptions.NotAuthenticated()

        garage_pk = kwargs.get("garage_pk")
        logger.info(f"Garage PK: {garage_pk}")

        if garage_pk is None:
            raise exceptions.NotFound("Garage not found.")

        try:
            # Attempt to get the garage from the user's related garage
            user = CustomUser.objects.get(id=request.user.id)
            # User not assigned to garage (platform specific user) are not allowed to view garage specific data
            if not user.garage:
                raise exceptions.PermissionDenied("User is not assigned to a garage.")

            if str(user.garage.id) != str(garage_pk):
                raise exceptions.NotFound("Garage not found.")

            self.garage = user.garage
        except (Garage.DoesNotExist, CustomUser.DoesNotExist):
            raise exceptions.NotFound()

        super().initial(request, *args, **kwargs)
