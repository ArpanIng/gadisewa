from decimal import Decimal

from django.db import models
from django.core.validators import MinValueValidator

# from garages.models import Job
from shared.models import GarageMixin, TimeStampMixin, GarageAwareModel
from shared.validators import nepali_phone_validator


class Category(GarageMixin, TimeStampMixin, GarageAwareModel):
    """Model representing part category of a garage."""

    name = models.CharField(max_length=255, db_index=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["garage", "name"], name="unique_category_name_per_garage"
            ),
        ]

    def __str__(self):
        return self.name


class Supplier(GarageMixin, TimeStampMixin, GarageAwareModel):
    """Model representing supplier of a garage."""

    name = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, validators=[nepali_phone_validator])
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["garage", "name"], name="unique_supplier_name_per_garage"
            ),
            models.UniqueConstraint(
                fields=["garage", "phone_number"], name="unique_supplier_phone_number_per_garage"
            ),
            models.UniqueConstraint(
                fields=["garage", "email"],
                condition=models.Q(email__isnull=False),
                name="unique_supplier_email_per_garage",
            ),
        ]

    def __str__(self):
        return self.name


class Part(GarageMixin, TimeStampMixin, GarageAwareModel):
    """Model representing inventory parts/items in a garage."""

    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=50)
    brand = models.CharField(max_length=100, blank=True, default="")
    image = models.ImageField(upload_to="parts/", null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="parts")
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT, related_name="supplied_parts")
    purchase_price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal(0))]
    )
    selling_price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal(0))]
    )
    quantity = models.PositiveIntegerField(default=0)

    #     reorder_level = models.PositiveIntegerField(default=0)
    #     warranty_period_days = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["garage", "sku"], name="unique_sku_per_garage"),
        ]

    def in_stock(self):
        pass

    def is_out_of_stock(self):
        pass

    def in_low_stock(self):
        pass


# class PurchaseOrder(GarageMixin, TimeStampMixin, GarageAwareModel):
#     class PurchaseStatus(models.TextChoices):
#         OPEN = "open", "Open"
#         RECEIVED = "received", "Received"
#         CANCELLED = "cancelled", "Cancelled"

#     supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
#     order_date = models.DateTimeField(auto_now_add=True)
#     expected_delivery_date = models.DateField()
#     status = models.CharField(
#         max_length=20, choices=PurchaseStatus.choices, default=PurchaseStatus.OPEN
#     )


# class PurchaseOrderItem(GarageMixin, TimeStampMixin, GarageAwareModel):
#     purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='items')
#     part = models.ForeignKey(Part, on_delete=models.CASCADE)
#     quantity_ordered = models.IntegerField()
#     quantity_received = models.IntegerField(default=0)
#     cost_price = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(Decimal(0))])

#     class Meta:
#         constraints = [
#             models.UniqueConstraint(fields=['garage', 'purchase_order', 'item'], name='unique_po_item_per_garage')
#         ]

#     def __str__(self):
#         return f"{self.part.name} x{self.quantity_ordered} ({self.garage.name})"


# class PartUsage(models.Model):
#     job = models.ForeignKey(Job, on_delete=models.CASCADE)
#     part = models.ForeignKey(Part, on_delete=models.PROTECT)
#     quantity = models.PositiveIntegerField()

#     # price at time of use (in case part cost changes later)
#     unit_price = models.DecimalField(max_digits=8, decimal_places=2)
