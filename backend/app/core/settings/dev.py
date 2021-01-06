from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 't-zl$)!^dhh$kiz8-)!rr02t8uhn4%v6nl*f*y62p9xmxy94dh'

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# Set env variables
POSTGRES_DB_NAME = 'mowo_db_2'
POSTGRES_DB_USER = 'postgres'
POSTGRES_DB_PASSWORD = 'postgres'
POSTGRES_DB_HOST = 'db'
POSTGRES_DB_PORT = 5432
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': POSTGRES_DB_NAME,
        'USER': POSTGRES_DB_USER,
        'PASSWORD': POSTGRES_DB_PASSWORD,
        # "db" in production && "localhost" when dev without docker postgres
        'HOST': POSTGRES_DB_HOST,
        'PORT': POSTGRES_DB_PORT,
    }
}

# S3 Bucket Connection
AWS_ACCESS_KEY_ID = 'AKIA4NGTH73S3GKH6Y4R'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'mowo-location-images'

# Stripe payment
STRIPE_SECRET_KEY = 'sk_test_51I47k4IpxsSLqlNauw6wmmjRKovYXwaHQqmmb4QXs6kIoXsDX3SPJId1Lrhafy2kU3oBmSKtMWAJ637MoZ5KLmIE00SvOF10NX'

# Client Domain
CLIENT_DOMAIN = 'http://localhost:3001/'

try:
    from .local import *
except ImportError:
    pass
