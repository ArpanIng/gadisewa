from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

from .models import Employee


class IsASuperUser(permissions.BasePermission):
    """
    Allows access only to superuser users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff and request.user.is_superuser)


class IsCurrentUser(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return obj.pk == user.pk


class IsGarageAdmin(permissions.BasePermission):
    """
    Allows access only to admin role users of a garage.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False

        # # allow access to system superuser
        # if user.is_staff and user.is_superuser:
        #     return True

        if hasattr(user, "employee"):
            return user.employee.role == Employee.EmployeeRoleChoices.ADMIN
        return False
