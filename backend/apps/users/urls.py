from django.urls import path
from rest_framework import routers

from .views import (
    CustomerViewSet,
    EmployeeViewSet,
    CurrentUserProfileView,
    UserViewSet,
    ChangePasswordView,
    CustomTokenRefreshView,
    LoginView,
    LogoutView,
    UserRegistrationView,
)

router = routers.SimpleRouter()
# router.register(r"users", UserViewSet, basename='users')
router.register(r"customers", CustomerViewSet, basename="customers")
router.register(r"employees", EmployeeViewSet, basename="employees")

urlpatterns = [
    path("profile/", CurrentUserProfileView.as_view(), name="profile"),
    path("auth/login/", LoginView.as_view(), name="token_obtain_pair"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/register/", UserRegistrationView.as_view(), name="register"),
    path("auth/password_change/", ChangePasswordView.as_view(), name="password_change"),
    path("auth/token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
