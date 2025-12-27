from rest_framework.permissions import BasePermission


class IsGarageRequest(BasePermission):
    """
    Only allow access if request has a garage.
    """

    def has_permission(self, request, view):
        return getattr(request, "garage", None) is not None
