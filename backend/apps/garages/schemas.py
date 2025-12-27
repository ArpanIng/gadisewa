from drf_spectacular.utils import extend_schema, extend_schema_view

garage_schema = extend_schema_view(
    list=extend_schema(description="List all garages in the system."),
    create=extend_schema(description="Create a new garage in the system."),
    retrieve=extend_schema(description="Retrieve a garage instance from the system."),
    update=extend_schema(description="Update a garage instance in the system."),
    destroy=extend_schema(description="Delete a garage instance from the system."),
)

service_schema = extend_schema_view(
    list=extend_schema(description="List all services of a garage."),
    create=extend_schema(description="Create a new service for a garage."),
    retrieve=extend_schema(description="Retrieve a service of a garage."),
    update=extend_schema(description="Update a service of a garage."),
    destroy=extend_schema(description="Delete a service of a garage."),
)

vehicle_schema = extend_schema_view(
    list=extend_schema(description="List all vehicles of a garage."),
    create=extend_schema(description="Create a new vehicle for a garage."),
    retrieve=extend_schema(description="Retrieve a vehicle of a garage."),
    update=extend_schema(description="Update a vehicle of a garage."),
    destroy=extend_schema(description="Delete a vehicle of a garage."),
)

appointments_schema = extend_schema_view(
    list=extend_schema(description="List all appointments of a garage."),
    create=extend_schema(description="Create a new appointment for a garage."),
    retrieve=extend_schema(description="Retrieve a appointment of a garage."),
    update=extend_schema(description="Update a appointment of a garage."),
    destroy=extend_schema(description="Delete a appointment of a garage."),
)
