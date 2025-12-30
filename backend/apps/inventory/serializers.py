from rest_framework import serializers

from .models import Category, Supplier, Part


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "is_active", "created_at", "updated_at"]

    def validate_name(self, value):
        """Check name is unique per garage."""

        garage = self.context.get("request").garage

        queryset = Category.objects.filter(garage=garage, name=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Category with this name already exists.")

        return value


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ["id", "name", "email", "phone_number", "is_active", "created_at", "updated_at"]

    def validate_name(self, value):
        """Check name is unique per garage."""

        garage = self.context.get("request").garage

        queryset = Supplier.objects.filter(garage=garage, name=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Supplier with this name already exists.")

        return value

    def validate_phone_number(self, value):
        """Check phone number is unique per garage."""

        garage = self.context.get("request").garage

        queryset = Supplier.objects.filter(garage=garage, phone_number=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Supplier with this phone number already exists.")

        return value

    def validate_email(self, value):
        """Check email is unique per garage, if email is not None."""

        garage = self.context.get("request").garage

        if value:
            queryset = Supplier.objects.filter(garage=garage, email=value)
            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)

            if queryset.exists():
                raise serializers.ValidationError("Supplier with this email already exists.")

        return value


class PartSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.none(),
        source="category",
        write_only=True,
    )
    supplier = SupplierSerializer(read_only=True)
    supplier_id = serializers.PrimaryKeyRelatedField(
        queryset=Supplier.objects.none(),
        source="supplier",
        write_only=True,
    )
    in_stock = serializers.ReadOnlyField()
    in_low_stock = serializers.ReadOnlyField()
    is_out_of_stock = serializers.ReadOnlyField()

    class Meta:
        model = Part
        # fmt: off
        fields = [
            "id", "name", "sku", "brand", "image",
            "category", "category_id", "supplier", "supplier_id",
            "purchase_price", "selling_price",
            "quantity", "in_stock", "is_out_of_stock", "in_low_stock",
            "created_at", "updated_at",
        ]
        # fmt: on

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        garage = self.context.get("request").garage

        self.fields["category_id"].queryset = Category.objects.filter(garage=garage, is_active=True)
        self.fields["supplier_id"].queryset = Supplier.objects.filter(garage=garage, is_active=True)

    def validate_sku(self, value):
        """Check sku is unique per garage."""

        garage = self.context.get("request").garage

        queryset = Part.objects.filter(garage=garage, sku=value)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Part with this SKU already exists.")

        return value
