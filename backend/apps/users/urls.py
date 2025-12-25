from django.urls import path
from rest_framework import routers

from .views import CustomerViewSet, UserViewSet

router = routers.SimpleRouter()
router.register(r"users", UserViewSet)
router.register(r"customers", CustomerViewSet)

urlpatterns = router.urls

from django.urls import path

from .views import (
    ChangePasswordView,
    CustomTokenRefreshView,
    LoginView,
    LogoutView,
    UserRegistrationView,
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("password_change/", ChangePasswordView.as_view(), name="password_change"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
]
