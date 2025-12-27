from drf_spectacular.utils import extend_schema, extend_schema_view

customer_schema = extend_schema_view(
    list=extend_schema(description="List all customers of a garage."),
    create=extend_schema(description="Create a new customer for a garage."),
    retrieve=extend_schema(description="Retrieve a customer of a garage."),
    update=extend_schema(description="Update a customer of a garage."),
    destroy=extend_schema(description="Delete a customer of a garage."),
)

employee_schema = extend_schema_view(
    list=extend_schema(description="List all employees of a garage."),
    create=extend_schema(description="Create a new employee for a garage."),
    retrieve=extend_schema(description="Retrieve a employee of a garage."),
    update=extend_schema(description="Update a employee of a garage."),
    destroy=extend_schema(description="Delete a employee of a garage."),
)
