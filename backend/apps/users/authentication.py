from django.conf import settings
from rest_framework import exceptions
from rest_framework.authentication import CSRFCheck
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTCookieAuthentication(JWTAuthentication):
    """
    An custom authentication plugin that authenticates requests through
    a HttpOnly cookie JSON web token provided in a request header.
    """

    def enforce_csrf(self, request):
        """
        Enforce CSRF validation for session based authentication.
        """

        def dummy_get_response(request):  # pragma: no cover
            return None

        check = CSRFCheck(dummy_get_response)
        # populates request.META['CSRF_COOKIE'], which is used in process_view()
        check.process_request(request)
        reason = check.process_view(request, None, (), {})
        if reason:
            # CSRF failed, bail with explicit error message
            raise exceptions.PermissionDenied(f"CSRF Failed: {reason}")

    def authenticate(self, request: Request):
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get(settings.JWT_ACCESS_TOKEN_KEY)
            self.enforce_csrf(request)
        else:
            raw_token = self.get_raw_token(header)

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        # return validated user
        return self.get_user(validated_token), validated_token
