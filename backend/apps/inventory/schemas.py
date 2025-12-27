from drf_spectacular.utils import extend_schema, extend_schema_view

category_schema = extend_schema_view(
    list=extend_schema(description="List all categories of a garage."),
    create=extend_schema(description="Create a new category for a garage."),
    retrieve=extend_schema(description="Retrieve a category of a garage."),
    update=extend_schema(description="Update a category of a garage."),
    destroy=extend_schema(description="Delete a category of a garage."),
)

part_schema = extend_schema_view(
    list=extend_schema(description="List all inventory parts of a garage."),
    create=extend_schema(description="Create a new inventory part for a garage."),
    retrieve=extend_schema(description="Retrieve a inventory part of a garage."),
    update=extend_schema(description="Update a inventory part of a garage."),
    destroy=extend_schema(description="Delete a inventory part of a garage."),
)

supplier_schema = extend_schema_view(
    list=extend_schema(description="List all suppliers of a garage."),
    create=extend_schema(description="Create a new supplier for a garage."),
    retrieve=extend_schema(description="Retrieve a supplier of a garage."),
    update=extend_schema(description="Update a supplier of a garage."),
    destroy=extend_schema(description="Delete a supplier of a garage."),
)
