import logging

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Count
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from apps.tenants.viewsets import GarageGenericViewSet
from .models import Customer, CustomUser, Employee
from .permissions import IsGarageAdmin
from .schemas import customer_schema, employee_schema
from .serializers import (
    AdminChangePasswordSerializer,
    AdminChangePasswordSuccessSerializer,
    ChangePasswordSerializer,
    ChangePasswordSuccessSerializer,
    CustomerSerializer,
    CustomerDetailSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshResponse,
    LoginSuccessSerializer,
    LogoutSuccessSerializer,
    UserRegistrationSerializer,
    UserRegistrationSuccessSerializer,
    UserSerializer,
    UserProfileSerializer,
    EmployeeCreateSerializer,
    EmployeeUpdateSerializer,
    EmployeeReadSerializer,
)

logger = logging.getLogger(__name__)


HTTP_ACCESS_COOKIE_MAX_AGE = int(jwt_settings.ACCESS_TOKEN_LIFETIME.total_seconds())
HTTP_REFRESH_COOKIE_MAX_AGE = int(jwt_settings.REFRESH_TOKEN_LIFETIME.total_seconds())

logger = logging.getLogger(__name__)
User = get_user_model()

from django.http import JsonResponse


@api_view(["GET"])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf(request):
    """
    An endpoint to set the CSRF cookie.
    """
    return JsonResponse({"detail": "CSRF cookie set"})


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


# @extend_schema(responses={200: LoginSuccessSerializer})
# class LoginView(TokenObtainPairView):
#     """Authenticates a user."""

#     permission_classes = [permissions.AllowAny]
#     serializer_class = CustomTokenObtainPairSerializer

#     def post(self, request: Request, *args, **kwargs) -> Response:
#         response = super().post(request, *args, **kwargs)

#         data = response.data
#         access_token = data["access"]
#         refresh_token = data["refresh"]

#         res = Response({"success": True, "detail": "Login successful."})
#         res.set_cookie(
#             key=settings.JWT_ACCESS_TOKEN_KEY,
#             value=access_token,
#             max_age=HTTP_ACCESS_COOKIE_MAX_AGE,
#             path=settings.HTTP_COOKIE_PATH,
#             secure=settings.HTTP_COOKIE_SECURE,
#             httponly=settings.HTTP_COOKIE_HTTPONLY,
#             samesite="None",
#             # samesite=settings.HTTP_COOKIE_SAMESITE,
#         )

#         res.set_cookie(
#             key=settings.JWT_REFRESH_TOKEN_KEY,
#             value=refresh_token,
#             max_age=HTTP_REFRESH_COOKIE_MAX_AGE,
#             path=settings.HTTP_COOKIE_PATH,
#             secure=settings.HTTP_COOKIE_SECURE,
#             httponly=settings.HTTP_COOKIE_HTTPONLY,
#             samesite="None",
#             # samesite=settings.HTTP_COOKIE_SAMESITE,
#         )

#         # set csrf
#         # csrf_token = csrf.get_token(request)

#         # res.set_cookie(
#         #     key=settings.JWT_REFRESH_TOKEN_KEY,
#         #     value=refresh_token,
#         #     max_age=HTTP_REFRESH_COOKIE_MAX_AGE,
#         #     path=settings.HTTP_COOKIE_PATH,
#         #     secure=False,
#         #     httponly=settings.HTTP_COOKIE_HTTPONLY,
#         #     samesite='None',
#         #     domain=".localhost",
#         # )

#         # set csrf
#         csrf_token = csrf.get_token(request)

#         res.set_cookie(
#             key="csrftoken",
#             value=csrf_token,
#             httponly=False,
#             secure=False,
#             samesite="Lax",
#         )

#         return res


@extend_schema(responses={200: LoginSuccessSerializer})
class LoginView(TokenObtainPairView):
    """Authenticates a user."""

    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


# @extend_schema(responses={200: LogoutSuccessSerializer})
# class LogoutView(APIView):
#     """log out the authenticated user."""

#     def post(self, request: Request, *args, **kwargs) -> Response:
#         refresh_token = request.COOKIES.get(settings.JWT_REFRESH_TOKEN_KEY)
#         if refresh_token:
#             try:
#                 refresh = RefreshToken(refresh_token)
#                 # blacklist the token after logout
#                 refresh.blacklist()
#             except Exception as e:
#                 return Response(
#                     {"success": False, "error": f"Error invalidating token: {e}"},
#                     status=status.HTTP_400_BAD_REQUEST,
#                 )

#         response = Response({"success": True, "detail": "Logout successful."})
#         # delete tokens from the cookie
#         response.delete_cookie(settings.JWT_ACCESS_TOKEN_KEY)
#         response.delete_cookie(settings.JWT_REFRESH_TOKEN_KEY)
#         return response


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


# @extend_schema(responses={200: CustomTokenRefreshResponse})
# class CustomTokenRefreshView(TokenRefreshView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request: Request, *args, **kwargs) -> Response:
#         try:
#             refresh_token = request.COOKIES.get(settings.JWT_REFRESH_TOKEN_KEY)
#             request.data["refresh"] = refresh_token
#             response = super().post(request, *args, **kwargs)

#             data = response.data
#             access_token = data["access"]

#             res = Response({"success": True, "detail": "Token refreshed successfully."})
#             res.set_cookie(
#                 key=settings.JWT_ACCESS_TOKEN_KEY,
#                 value=access_token,
#                 max_age=HTTP_ACCESS_COOKIE_MAX_AGE,
#                 path=settings.HTTP_COOKIE_PATH,
#                 secure=settings.HTTP_COOKIE_SECURE,
#                 httponly=settings.HTTP_COOKIE_HTTPONLY,
#                 samesite=settings.HTTP_COOKIE_SAMESITE,
#             )

#             return res
#         except InvalidToken:
#             return Response(
#                 {"success": False, "detail": "Invalid token."},
#                 status=status.HTTP_401_UNAUTHORIZED,
#             )


@extend_schema(responses={200: CustomTokenRefreshResponse})
class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]

    # def post(self, request: Request, *args, **kwargs) -> Response:
    #     try:
    #         refresh_token = request.COOKIES.get(settings.JWT_REFRESH_TOKEN_KEY)
    #         request.data["refresh"] = refresh_token
    #         response = super().post(request, *args, **kwargs)

    #         data = response.data
    #         access_token = data["access"]

    #         res = Response({"success": True, "detail": "Token refreshed successfully."})
    #         res.set_cookie(
    #             key=settings.JWT_ACCESS_TOKEN_KEY,
    #             value=access_token,
    #             max_age=HTTP_ACCESS_COOKIE_MAX_AGE,
    #             path=settings.HTTP_COOKIE_PATH,
    #             secure=settings.HTTP_COOKIE_SECURE,
    #             httponly=settings.HTTP_COOKIE_HTTPONLY,
    #             samesite=settings.HTTP_COOKIE_SAMESITE,
    #         )

    #         return res
    #     except InvalidToken:
    #         return Response(
    #             {"success": False, "detail": "Invalid token."},
    #             status=status.HTTP_401_UNAUTHORIZED,
    #         )


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


class CurrentUserProfileView(RetrieveAPIView):
    """Get current authenticated user."""

    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


@customer_schema
class CustomerViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    lookup_url_kwarg = "customer_id"
    # permission_classes = [IsGarageAdmin]
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Customer.objects.filter(garage=self.garage).annotate(vehicle_count=Count("vehicles"))

    def get_serializer_class(self):
        if self.action in "retrieve":
            return CustomerDetailSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        serializer.save(garage=self.garage)

    def perform_update(self, serializer):
        serializer.save(garage=self.garage)


@employee_schema
class EmployeeViewSet(GarageGenericViewSet, viewsets.ModelViewSet):
    serializer_class = EmployeeReadSerializer
    http_method_names = ["get", "post", "put", "delete", "head", "options"]
    lookup_url_kwarg = "employee_id"
    # permission_classes = [IsGarageAdmin]
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_filters = ["first_name", "last_name", "email"]
    ordering_fields = ["id", "first_name", "last_name"]
    filterset_fields = ["role", "user__is_active"]

    def get_queryset(self):
        return Employee.objects.filter(garage=self.garage).select_related("garage", "user")

    def get_serializer_class(self):
        if self.action == "create":
            return EmployeeCreateSerializer
        elif self.action == "update":
            return EmployeeUpdateSerializer
        return self.serializer_class

    def perform_destroy(self, instance):
        user = instance.user
        user.is_active = False
        user.save(update_fields=["is_active"])

    @extend_schema(request=EmployeeCreateSerializer, responses=EmployeeReadSerializer)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
        read_serializer = EmployeeReadSerializer(employee, context={"request": request})
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(request=EmployeeUpdateSerializer, responses=EmployeeReadSerializer)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
