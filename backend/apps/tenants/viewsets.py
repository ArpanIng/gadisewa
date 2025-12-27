from rest_framework.viewsets import GenericViewSet
from rest_framework import exceptions


class GarageGenericViewSet(GenericViewSet):
    """
    Base GenericViewSet that sets self.garage automatically.
    """

    def initial(self, request, *args, **kwargs):
        """
        Called before any action.
        """
        super().initial(request, *args, **kwargs)
        self.garage = getattr(request, "garage", None)
        if self.garage is None:
            raise exceptions.PermissionDenied("garage not found.")
