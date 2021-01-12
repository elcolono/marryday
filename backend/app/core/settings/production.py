from .base import *

DEBUG = False
SECRET_KEY = 't-zl$)!^dhh$kiz8-)!rr02t8uhn4%v6nl*f*y62p9xmxy94dh'

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.9/ref/settings/#allowed-hosts
ALLOWED_HOSTS = [
    'backend'
]

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# Set env variables
POSTGRES_DB_NAME = os.environ.get('POSTGRES_DB_NAME')
POSTGRES_DB_USER = os.environ.get('POSTGRES_DB_USER')
POSTGRES_DB_PASSWORD = os.environ.get('POSTGRES_DB_PASSWORD')
POSTGRES_DB_HOST = os.environ.get('POSTGRES_DB_HOST')
POSTGRES_DB_PORT = os.environ.get('POSTGRES_DB_PORT')

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

## Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'debug.log'),
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# Compressor SETTINGS
# STATICFILES_FINDERS += ['compressor.finders.CompressorFinder',]

# COMPRESS_ENABLED = True
# COMPRESS_OFFLINE = True

# COMPRESS_URL = STATIC_URL
# COMPRESS_CSS_FILTERS = [
#     'compressor.filters.css_default.CssAbsoluteFilter',
#     'compressor.filters.cssmin.CSSMinFilter'
# ]
# COMPRESS_JS_FILTERS = [
#     'compressor.filters.jsmin.JSMinFilter',
# ]
# COMPRESS_STORAGE = 'compressor.storage.GzipCompressorFileStorage' 


try:
    from .local import *
except ImportError:
    pass
