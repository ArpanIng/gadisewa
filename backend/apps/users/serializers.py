from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.garages.models import Vehicle
from .models import Customer, Employee

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
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )
    confirm_password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

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
    vehicle_count = serializers.IntegerField(read_only=True)

    # TODO: Add total jobs and last_visit
    class Meta:
        model = Customer
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "address",
            "avatar",
            "vehicle_count",
            "created_at",
            "updated_at",
        ]

    def validate_phone_number(self, value):
        """Check phone number is unique per garage."""

        garage = self.context.get("request").garage

        queryset = Customer.objects.filter(garage=garage, phone_number=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Customer with this phone number already exists.")

        return value

    def validate_email(self, value):
        """Check email is unique per garage."""

        garage = self.context.get("request").garage

        queryset = Customer.objects.filter(garage=garage, email=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Customer with this email already exists.")

        return value


class MinimalCustomerVehicleSerializer(serializers.ModelSerializer):
    """Minimal vehicle serializer for customer profile."""

    class Meta:
        model = Vehicle
        fields = ["id", "registration_number", "make", "model", "year"]


class CustomerDetailSerializer(serializers.ModelSerializer):
    vehicle_count = serializers.IntegerField(read_only=True)
    vehicles = MinimalCustomerVehicleSerializer(many=True, read_only=True)

    # vehicles = serializers.SerializerMethodField()
    class Meta:
        model = Customer
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "address",
            "avatar",
            "vehicle_count",
            "vehicles",
            "created_at",
            "updated_at",
        ]

    # def get_vehicles(self, obj):
    #     from apps.garages.serializers import MinimalCustomerVehicleSerializer
    #     return MinimalCustomerVehicleSerializer(obj.vehicles.all(), many=True).data


class MinimalCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "id",
            "first_name",
            "last_name",
        ]


class EmployeeCreateSerializer(serializers.Serializer):
    # user fields
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(max_length=254)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    password = serializers.CharField(
        required=True,
        style={"input_type": "password"},
        validators=[validate_password],
        write_only=True,
    )
    confirm_password = serializers.CharField(
        required=True, style={"input_type": "password"}, write_only=True
    )
    # employee fields
    role = serializers.ChoiceField(choices=Employee.EmployeeRoleChoices.choices)
    avatar = serializers.ImageField(allow_null=True, max_length=100, required=False)

    class Meta:
        model = Employee
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "confirm_password",
            "role",
            "avatar",
        ]

    def validate_username(self, value):
        """Check username is unique per garage."""

        garage = self.context.get("request").garage

        if User.objects.filter(username=value, garage=garage).exists():
            raise serializers.ValidationError("A user with this username already exists.")

        return value

    def validate_email(self, value):
        """Check email is unique per garage."""

        garage = self.context.get("request").garage

        if User.objects.filter(email=value, garage=garage).exists():
            raise serializers.ValidationError("A user with this email already exists.")

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Password fields didn't match."})

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        garage = self.context.get("request").garage

        email = validated_data["email"]
        username = validated_data["username"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        password = validated_data["password"]
        role = validated_data["role"]

        # create user instance
        user = User.objects.create_user(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            garage=garage,
        )
        # create employee instance
        employee = Employee.objects.create(user=user, garage=garage, role=role)

        return employee


class EmployeeUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.EmailField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = Employee
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "avatar",
        ]

    def validate_username(self, value):
        """Ensure username is unique per garage (excluding self)."""
        employee = self.instance
        garage = employee.garage

        if User.objects.filter(username=value, garage=garage).exclude(pk=employee.user.pk).exists():
            raise serializers.ValidationError("A user with this username already exists.")

        return value

    def validate_email(self, value):
        """Ensure email is unique per garage (excluding self)."""
        employee = self.instance
        garage = employee.garage

        if User.objects.filter(email=value, garage=garage).exclude(pk=employee.user.pk).exists():
            raise serializers.ValidationError("A user with this email already exists.")

        return value

    def update(self, instance, validated_data):
        # Update user fields
        user_data = validated_data.pop("user", {})
        for attr, value in user_data.items():
            setattr(instance.user, attr, value)
        instance.user.save()

        # Update employee fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class EmployeeReadSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.CharField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    is_active = serializers.BooleanField(source="user.is_active")
    last_login = serializers.CharField(source="user.last_login")

    class Meta:
        model = Employee
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "avatar",
            "is_active",
            "last_login",
            "created_at",
            "updated_at",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["role"] = instance.get_role_display()
        return data


class UserProfileSerializer(serializers.ModelSerializer):
    garage = serializers.CharField(source="garage.subdomain", default=None)
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "garage",
            "role",
        ]

    def get_role(self, obj):
        # Return employee role if user has employee
        if hasattr(obj, "employee") and obj.employee:
            return obj.employee.get_role_display()
        return None
