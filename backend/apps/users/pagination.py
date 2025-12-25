from rest_framework.pagination import LimitOffsetPagination


class CustomLimitOffsetPagination(LimitOffsetPagination):
    """Custom limit/offset based pagination with max-limit."""

    max_limit = 100
