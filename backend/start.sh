#!/usr/bin/env bash

# Start Gunicorn processes
# ToDO: Optimized cache configuration e.g. maybe array of dirs possible?
# ToDO: Optimized worker configuration e.g. maybe more workers?
echo Starting Gunicorn.
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 1 \
    --chdir core
