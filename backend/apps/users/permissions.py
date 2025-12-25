from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class IsCurrentUser(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return obj.pk == user.pk
