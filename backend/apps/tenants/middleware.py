from django.http import Http404

from .models import Garage

RESERVED_SUBDOMAINS = {"www", "api", "admin"}


def get_subdomain(host: str) -> str | None:
    """
    Extract tenant subdomain from host.

    Examples:
      tenantA.myapp.com      -> tenanta
      tenantA.localhost      -> tenanta
      myapp.com              -> None
      www.myapp.com          -> None
    """
    if not host:
        return None

    host = host.split(":")[0].lower()
    parts = host.split(".")

    if host.endswith("localhost"):
        return parts[0] if len(parts) > 1 else None

    if len(parts) < 3:
        return None

    subdomain = parts[0]

    if subdomain in RESERVED_SUBDOMAINS:
        return None

    return subdomain


class GarageMiddleware:
    """
    Resolve Garage (tenant) from subdomain and attach it to request.

    - request.garage is always set (Garage instance or None)
    - Invalid subdomain => 404
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host()
        subdomain = get_subdomain(host)

        # No tenant context (e.g., marketing site)
        if not subdomain:
            request.garage = None
            return self.get_response(request)

        try:
            garage = Garage.objects.get(
                subdomain__iexact=subdomain,
                is_active=True,
            )

        except Garage.DoesNotExist:
            raise Http404("Garage not found")

        request.garage = garage
        return self.get_response(request)
