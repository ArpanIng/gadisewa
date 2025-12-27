from django.core.validators import RegexValidator

nepali_phone_validator = RegexValidator(
    regex=r"^(\+?977)?9[78]\d{8}$",
    message="Enter a valid Nepali phone number.",
    # code='invalid_phone_number'
)
