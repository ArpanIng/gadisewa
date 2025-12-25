from django.db import models
from garages.models import Job


class Category(models.Model):
    """Model representing part category of a garage."""

    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Supplier(models.Model):
    """Model representing supplier of a garage."""

    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class PurchaseOrder(models.Model):
    class PurchaseStatus(models.TextChoices):
        OPEN = "open", "Open"
        RECEIVED = "received", "Received"
        CANCELLED = "cancelled", "Cancelled"

    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20, choices=PurchaseStatus.choices, default=PurchaseStatus.OPEN
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Part(models.Model):
    sku = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100, blank=True, default="")
    cost_price = models.DecimalField(max_digits=8, decimal_places=2)
    sell_price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)

    reorder_level = models.IntegerField(default=5)

    def in_stock(self):
        pass

    def is_out_of_stock(self):
        pass

    def in_low_stock(self):
        pass


class PartUsage(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    part = models.ForeignKey(Part, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()

    # price at time of use (in case part cost changes later)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)


class PurchaseOrderItem(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    cost_price = models.DecimalField(max_digits=8, decimal_places=2)
