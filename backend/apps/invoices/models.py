from decimal import Decimal

from django.db import models
from garages.models import WorkOrder


class Invoice(models.Model):
    work_order = models.OneToOneField(WorkOrder, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
        max_length=20,
        choices=[("unpaid", "Unpaid"), ("paid", "Paid"), ("void", "Void")],
        default="unpaid",
    )

    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal(0))


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=8, decimal_places=2)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)


class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(
        max_length=20, choices=[("cash", "Cash"), ("card", "Card"), ("transfer", "Bank Transfer")]
    )
    paid_at = models.DateTimeField(auto_now_add=True)
