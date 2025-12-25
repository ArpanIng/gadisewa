import logging

from django.conf import settings
from django.contrib.auth import get_user_model
from django.middleware import csrf
from drf_spectacular.utils import OpenApiResponse, extend_schema, inline_serializer
from rest_framework import mixins, permissions, serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .models import Customer, CustomUser, Employee
from .serializers import (
    AdminChangePasswordSerializer,
    AdminChangePasswordSuccessSerializer,
    ChangePasswordSerializer,
    ChangePasswordSuccessSerializer,
    CustomerSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshResponse,
    LoginSuccessSerializer,
    LogoutSuccessSerializer,
    UserRegistrationSerializer,
    UserRegistrationSuccessSerializer,
    UserSerializer,
)

logger = logging.getLogger(__name__)


HTTP_ACCESS_COOKIE_MAX_AGE = int(jwt_settings.ACCESS_TOKEN_LIFETIME.total_seconds())
HTTP_REFRESH_COOKIE_MAX_AGE = int(jwt_settings.REFRESH_TOKEN_LIFETIME.total_seconds())

logger = logging.getLogger(__name__)
User = get_user_model()


@extend_schema(responses={201: UserRegistrationSuccessSerializer})
class UserRegistrationView(APIView):
    """Register a new user."""

    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerializer

    def post(self, request: Request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"success": True, "detail": "User registered successfully."})


@extend_schema(responses={200: LoginSuccessSerializer})
class LoginView(TokenObtainPairView):
    """Authenticates a user."""

    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)

        data = response.data
        access_token = data["access"]
        refresh_token = data["refresh"]

        res = Response({"success": True, "detail": "Login successful."})
        res.set_cookie(
            key=settings.JWT_ACCESS_TOKEN_KEY,
            value=access_token,
            max_age=HTTP_ACCESS_COOKIE_MAX_AGE,
            path=settings.HTTP_COOKIE_PATH,
            secure=settings.HTTP_COOKIE_SECURE,
            httponly=settings.HTTP_COOKIE_HTTPONLY,
            samesite=settings.HTTP_COOKIE_SAMESITE,
        )

        res.set_cookie(
            key=settings.JWT_REFRESH_TOKEN_KEY,
            value=refresh_token,
            max_age=HTTP_REFRESH_COOKIE_MAX_AGE,
            path=settings.HTTP_COOKIE_PATH,
            secure=settings.HTTP_COOKIE_SECURE,
            httponly=settings.HTTP_COOKIE_HTTPONLY,
            samesite=settings.HTTP_COOKIE_SAMESITE,
        )

        # set csrf
        csrf.get_token(request=request)

        return res


@extend_schema(responses={200: LogoutSuccessSerializer})
class LogoutView(APIView):
    """log out the authenticated user."""

    def post(self, request: Request, *args, **kwargs) -> Response:
        refresh_token = request.COOKIES.get(settings.JWT_REFRESH_TOKEN_KEY)
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                # blacklist the token after logout
                refresh.blacklist()
            except Exception as e:
                return Response(
                    {"success": False, "error": f"Error invalidating token: {e}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        response = Response({"success": True, "detail": "Logout successful."})
        # delete tokens from the cookie
        response.delete_cookie(settings.JWT_ACCESS_TOKEN_KEY)
        response.delete_cookie(settings.JWT_REFRESH_TOKEN_KEY)
        return response


@extend_schema(responses={200: CustomTokenRefreshResponse})
class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request, *args, **kwargs) -> Response:
        try:
            refresh_token = request.COOKIES.get(settings.JWT_REFRESH_TOKEN_KEY)
            request.data["refresh"] = refresh_token
            response = super().post(request, *args, **kwargs)

            data = response.data
            access_token = data["access"]

            res = Response({"success": True, "detail": "Token refreshed successfully."})
            res.set_cookie(
                key=settings.JWT_ACCESS_TOKEN_KEY,
                value=access_token,
                max_age=HTTP_ACCESS_COOKIE_MAX_AGE,
                path=settings.HTTP_COOKIE_PATH,
                secure=settings.HTTP_COOKIE_SECURE,
                httponly=settings.HTTP_COOKIE_HTTPONLY,
                samesite=settings.HTTP_COOKIE_SAMESITE,
            )

            return res
        except InvalidToken:
            return Response(
                {"success": False, "detail": "Invalid token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


@extend_schema(responses={200: ChangePasswordSuccessSerializer})
class ChangePasswordView(APIView):
    """Change current user password."""

    serializer_class = ChangePasswordSerializer

    def put(self, request: Request, *args, **kwargs):
        serializer = self.serializer_class(
            request.user, data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"success": True, "detail": "Password changed successfully."})


class AdminChangePasswordView(APIView):
    """Change user's password."""

    permissions = [permissions.IsAdminUser]

    def put(self, request: Request, *args, **kwargs):
        serializer = AdminChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"success": True, "detail": "User password changed successfully."})


class UserViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        if self.action == "list" and not user.is_staff:
            queryset = queryset.filter(pk=user.pk)
        return queryset

    def get_permissions(self):
        if self.action == "list":
            permission_classes = [IsAdminUser]
        elif self.action == "set_password":
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == "set_password":
            return AdminChangePasswordSerializer
        return self.serializer_class

    @action(detail=False, methods=["get"])
    def me(self, request: Request, *args, **kwargs):
        """Return current authenticated user."""
        user = request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    @extend_schema(responses={200: AdminChangePasswordSuccessSerializer})
    @action(detail=True, methods=["put"])
    def set_password(self, request: Request, pk=None, *args, **kwargs):
        """Change user's password."""
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"success": True, "detail": "User password changed successfully."})


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
