from typing import Type

from rest_framework import status
from rest_framework.pagination import BasePagination
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.serializers import Serializer


class SuccessResponse(Response):
    """
    Custom Response for `OK` resource.

    **NOTE**: Do not use this for `list` method. It breaks filters format in DRF Browsable API.
    """

    def __init__(self, data, message: str, **kwargs):
        status_code = status.HTTP_200_OK
        response_data = {
            "success": True,
            "message": message,
            "status_code": status_code,
            "data": data,
        }
        super().__init__(data=response_data, status=status_code, **kwargs)


class CreatedResponse(Response):
    """
    Custom Response for `CREATED` resource.
    """

    def __init__(self, data, message: str, **kwargs):
        status_code = status.HTTP_201_CREATED
        response_data = {
            "success": True,
            "message": message,
            "status_code": status_code,
            "data": data,
        }
        super().__init__(data=response_data, status=status_code, **kwargs)


class BadRequestResponse(Response):
    """
    Custom Response for `BAD_REQUEST` resource.
    """

    def __init__(self, errors, message: str, **kwargs):
        status_code = status.HTTP_400_BAD_REQUEST
        response_data = {
            "success": False,
            "message": message,
            "status_code": status_code,
            "errors": errors,
        }
        super().__init__(data=response_data, status=status_code, **kwargs)


class NotFoundResponse(Response):
    """
    Custom Response for `NOT_FOUND` resource.
    """

    def __init__(self, message: str, **kwargs):
        status_code = status.HTTP_404_NOT_FOUND
        response_data = {
            "success": False,
            "message": message,
            "status_code": status_code,
        }
        super().__init__(data=response_data, status=status_code, **kwargs)


def get_pagination_response(
    *,
    pagination_class: Type[BasePagination],
    serializer_class: Type[Serializer],
    queryset,
    request: Request,
    view,
) -> Response:
    """
    Custom Response for pagination.

    **Usecase**: Use in DRF `APIView` and FBVs views.
    """

    paginator = pagination_class()
    page = paginator.paginate_queryset(queryset, request, view=view)
    if page is not None:
        serializer = serializer_class(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    serializer = serializer_class(queryset, many=True)
    return Response(serializer.data)
