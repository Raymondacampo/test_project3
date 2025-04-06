"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from dotenv import load_dotenv
import os
from datetime import timedelta
from django.urls import reverse_lazy

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

ALLOWED_HOSTS = ['localhost', 'juanpabloduarte.com']


# Application definition

INSTALLED_APPS = [
    'rest_framework',
    "rest_framework_simplejwt",
    'rest_framework.authtoken',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'corsheaders',  # Enables cross-origin requests (CORS)
    'api',

    "allauth",
    'allauth.account',
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",  # ✅ Google OAuth

    "django.contrib.sites",  # Required for Allauth
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
# ALLAUTH

SITE_ID = 1

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",  # ✅ Required for social login
]

SOCIALACCOUNT_LOGIN_REDIRECT_URL = "http://localhost:3000/auth/callback/"  # ✅ Redirect to Next.js >ACCOUNT_SIGNUP_REDIRECT_URL = "http://localhost:3000/auth/callback/"  # ✅ Redirect new users to pas>ACCOUNT_LOGOUT_REDIRECT_URL = "http://localhost:3000/login/"  # ✅ Redirect after logout
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False

# EMAIL SETTINGS
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'raymondacamposandoval@gmail.com'
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')

DEFAULT_FROM_EMAIL = 'raymondacamposandoval@gmail.com'


ACCOUNT_LOGIN_METHODS = {"email"}  # ✅ Use this instead
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
            'secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
            'key': ''
        },
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
    }
}


MIDDLEWARE = [
    'allauth.account.middleware.AccountMiddleware',
    'api.middleware.CustomXFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Allows frontend to access API
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# settings.py
X_FRAME_OPTIONS = 'DENY'  # Default, but we'll override for media

CORS_ALLOWED_ORIGINS = [
    "https://174.138.66.50",
    "https://juanpabloduarte.com",
    "http://localhost:3000",  # Allow Next.js frontend
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.AllowAny',
    ]
}




SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=120),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "BLACKLIST_AFTER_ROTATION": True,  # ✅ Blacklist old refresh tokens
    "ROTATE_REFRESH_TOKENS": True,  # ✅ Issue a new refresh token when refreshing
}

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'




# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'test_project_db',
#         'USER': 'jefe',
#         'PASSWORD': 'rabomonito',
#         'HOST': 'localhost',
#         'PORT': '5432',
#         }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'test_project_db'),
        'USER': os.getenv('DB_USER', 'jefe'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'rabomonito'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

CELERY_BEAT_SCHEDULE = {
    'cleanup-expired-tokens': {
        'task': 'myapp.tasks.cleanup_expired_tokens',
        'schedule': 86400.0,  # Every 24 hours (in seconds)
    },
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = "/media/"  # URL to access media files
MEDIA_ROOT = os.path.join(BASE_DIR, "media")  # Directory to store uploaded files


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field
AUTH_USER_MODEL = 'api.User'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'