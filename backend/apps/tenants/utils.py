from rest_framework import exceptions


def get_garage_from_request(request, required=True):
    """
    Centralized way to get the current garage from request.
    `required=True` will raise exception if garage is missing.
    """
    garage = getattr(request, "garage", None)
    if garage is None and required:
        raise exceptions.PermissionDenied("No garage found for this request.")
    return garage
