from django.db import models


class GarageMixin(models.Model):
    """All garage models must inherit this class."""

    garage = models.ForeignKey("garages.Garage", on_delete=models.CASCADE, db_index=True)

    class Meta:
        abstract = True


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
