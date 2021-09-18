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
POSTGRES_DB_NAME = 'mowo_db_dev_1'
POSTGRES_DB_USER = 'postgres'
POSTGRES_DB_PASSWORD = 'postgres'
POSTGRES_DB_HOST = 'localhost'
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
AWS_STORAGE_BUCKET_NAME = 'mowo-location-images'


# Mailchimp DEV Config
# MAILCHIMP_API_KEY is set via .env config for DEV Environment
MAILCHIMP_DATA_CENTER = "us7"
MAILCHIMP_EMAIL_LIST_ID = "d224e7b68b"


# Pipedrive
PIPEDRIVE_URL = "https://mowospaces.pipedrive.com/api/v1/"


# Client Domain
CLIENT_DOMAIN = 'http://localhost:3000/'

try:
    from .local import *
except ImportError:
    pass
