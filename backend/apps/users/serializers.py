from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Customer

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom TokenObtainPairSerializer with custom default error messages."""

    default_error_messages = {
        "no_active_account": "Invalid email or password.",
    }


class LoginSuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField(default=True, read_only=True)
    detail = serializers.CharField(default="Login successful.", read_only=True)


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ["username", "email", "password", "confirm_password"]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = get_user_model().objects.create_user(**validated_data)
        return user


class UserRegistrationSuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField(default=True, read_only=True)
    detail = serializers.CharField(default="User registered successfully.", read_only=True)


class LogoutSuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField(default=True, read_only=True)
    detail = serializers.CharField(default="Logout successful.", read_only=True)


class CustomTokenRefreshResponse(serializers.Serializer):
    success = serializers.BooleanField(default=True, read_only=True)
    detail = serializers.CharField(default="Token refreshed successfully.", read_only=True)


class ChangePasswordSerializer(serializers.ModelSerializer):
    """Serializer for change password."""

    password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ["password", "new_password", "confirm_password"]

    def validate_password(self, value):
        """Validate user's current password."""
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError({"password": "Password is not correct."})

        return value

    def validate(self, attrs):
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Password fields didn't match."})

        return attrs

    def update(self, instance, validated_data):
        instance.save_password(validated_data["new_password"])
        instance.save()
        return instance


class ChangePasswordSuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField(default=True, read_only=True)
    detail = serializers.CharField(default="Password changed successfully.", read_only=True)


class AdminChangePasswordSerializer(serializers.ModelSerializer):
    """Serializer for change password."""

    new_password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ["new_password", "confirm_password"]

    def validate(self, attrs):
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Password fields didn't match."})

        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data["new_password"])
        instance.save()
        return instance


class AdminChangePasswordSuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField(default=True, read_only=True)
    detail = serializers.CharField(default="User password changed successfully.", read_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "is_superuser",
            "date_joined",
            "last_login",
        ]
        read_only_fields = ["is_superuser", "date_joined", "last_login"]


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
