# MoWo Main Application

This repository provides an application for deploying a Django backend served by Nginx/Gunicorn on port 8000, and a NuxtJS/Vuetify front end served by Node on port 80.


### Prerequisites (For Development)

* Docker

	* Windows: Docker Desktop 2.0+ on Windows 10 Pro/Enterprise. Windows 10 Home (2004+) requires Docker Desktop 2.2+ and the WSL2 back-end. (Docker Toolbox is not supported.)

	* macOS: Docker Desktop 2.0+.

	* Linux: Docker CE/EE 18.06+ and Docker Compose 1.21+. (The Ubuntu snap package is not supported.)

* Visual Studio Code Extension: `Remote - Containers`


### Development Setup

Then run this application in the `DEV Container`!

You also need to set the environment variables. You can find an example in the

`env.example` file.



In the DEV Container start the django appliction with `python manage.py runserver`S


1. Start the django appliction with `python manage.py runserver`S

2. Start the vue/nuxt appliction with `yarn dev`S



For TypeScript users. 

See : https://typescript.nuxtjs.org/cookbook/components/


### Deployment Setup on any linux machine (Hetzner, AWS, etc.)

First go into the project root folder and git pull testing / production

Then build and run project

#### Local
Build and deploy image
```
docker-compose build
docker-compose up -d
```
#### Testing
docker-compose -f docker-compose.yml -f docker-compose.testing.yml build
docker-compose -f docker-compose.yml -f docker-compose.testing.yml up
docker-compose -f docker-compose.yml -f docker-compose.testing.yml down

#### Production
docker-compose -f docker-compose.yml -f docker-compose.production.yml build
docker-compose -f docker-compose.yml -f docker-compose.production.yml up
docker-compose -f docker-compose.yml -f docker-compose.production.yml down


```

Change wagtail site settings host to 'backend' and port to 8000









