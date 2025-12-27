from .utils import get_garage_from_request


class GarageMixin:
    """
    Add self.garage property to CBVs or DRF ViewSets
    """

    @property
    def garage(self):
        if not hasattr(self, "_garage"):
            self._garage = get_garage_from_request(self.request)
        return self._garage
