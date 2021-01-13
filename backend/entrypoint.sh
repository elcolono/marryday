#!/bin/bash

python manage.py migrate
# Required for tinymce (Atoherwise get 500 error because of misstic static files - jquery)
python manage.py collectstatic --noinput
python manage.py compress

echo "Running command '$*'"
exec /bin/bash -c "$*"
