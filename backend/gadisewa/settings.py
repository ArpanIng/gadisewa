import os
from datetime import timedelta
from pathlib import Path

import environ

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = [
    "localhost",
    ".localhost",  # allows any subdomain like garage1.localhost
]
# ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # local apps
    "apps.garages.apps.GaragesConfig",
    "apps.users.apps.UsersConfig",
    "apps.inventory.apps.InventoryConfig",
    "apps.tenants.apps.TenantsConfig",
    # third-party packages
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "django_filters",
    "drf_spectacular",
]

if DEBUG:
    INSTALLED_APPS += [
        "silk",
    ]


MIDDLEWARE = [
    "apps.tenants.middleware.GarageMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # cors headers
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

if DEBUG:
    MIDDLEWARE += [
        "silk.middleware.SilkyMiddleware",  # django-silk
    ]

ROOT_URLCONF = "gadisewa.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "gadisewa.wsgi.application"


# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kathmandu"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = "static/"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom User Model configuration
AUTH_USER_MODEL = "users.CustomUser"

AUTHENTICATION_BACKENDS = [
    "apps.users.backends.SubdomainAuthBackend",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.users.authentication.JWTCookieAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    # "DEFAULT_RENDERER_CLASSES": [
    #     "rest_framework.renderers.JSONRenderer",
    # ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PAGINATION_CLASS": "apps.users.pagination.CustomLimitOffsetPagination",
    "PAGE_SIZE": 10,
    "SEARCH_PARAM": "q",
    "ORDERING_PARAM": "sort",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

JWT_ACCESS_TOKEN_KEY: str = "access_token"
JWT_REFRESH_TOKEN_KEY: str = "refresh_token"
HTTP_COOKIE_PATH: str = "/"
HTTP_COOKIE_SECURE: bool = True
HTTP_COOKIE_HTTPONLY: bool = True
HTTP_COOKIE_SAMESITE: str = "Lax"

SPECTACULAR_SETTINGS = {
    "TITLE": "GadiSewa API",
    "DESCRIPTION": "",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    # OTHER SETTINGS
}

CORS_ALLOWED_ORIGINS = [
    # development origins
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    # production origins
]

CORS_ALLOW_CREDENTIALS = True


# logging configuration
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "app.log",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": True,
        },
        "": {
            "handlers": ["file"],
            "level": "INFO",
            "propagate": False,
        },
    },
}
