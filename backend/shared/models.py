from django.conf import settings
from django.db import models
from .exceptions import MissingGarageException


class GarageMixin(models.Model):
    """All garage models must inherit this class."""

    garage = models.ForeignKey(
        "tenants.Garage",
        on_delete=models.CASCADE,
        related_name="%(app_label)s_%(class)s",
        db_index=True,
    )

    class Meta:
        abstract = True


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserAuditMixin(models.Model):
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="%(class)s_created_by",
        null=True,
        blank=True,
        help_text="User who created this record",
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="%(class)s_last_modified_by",
        null=True,
        blank=True,
        help_text="User who last modified this record",
    )

    class Meta:
        abstract = True


class GarageAwareManager(models.Manager):
    def all(self):
        raise MissingGarageException(
            "Cannot add 'all()' method directly in GarageAwareManager. Garage must always be present."
        )

    def filter(self, *args, **kwargs):
        if "garage_id" not in kwargs and "garage" not in kwargs:
            raise MissingGarageException(
                "'garage_id' or 'garage' must be present as a keyboard argument in GarageAwareManager."
            )
        return super().filter(*args, **kwargs)


class GarageAwareModel(models.Model):
    # use separate manager for default manager
    objects_all_garages = models.Manager()
    # override default manager
    objects = GarageAwareManager()

    class Meta:
        abstract = True
