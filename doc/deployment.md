# Deployment

This repository provides an application for deploying a Django backend served by Nginx/Gunicorn on port 8000, and a NuxtJS/Vuetify front end served by Node on port 80.


### Local (For Development)

* Wagail Site settings: 
    * hostname: localhost
    * port: 8000



#### Testing
* Spin up App
    1. git pull (testing branch)
    2. docker-compose -f docker-compose.yml -f docker-compose.testing.yml up --build --force-recreate
        * Combines: 
        * docker-compose -f docker-compose.yml -f docker-compose.testing.yml build
        * docker-compose -f docker-compose.yml -f docker-compose.testing.yml down
        * docker-compose -f docker-compose.yml -f docker-compose.testing.yml up -d
    5. docker system prune (keep it clean)



### Production (For hHetzner)
* Create Postres DB
    * DB name
    * DB password

* mowo.space
* set env variables in the container MANUALLY OR DELETE ENV FILE AFTER CONTAINER SPIN UP

* Wagail Site settings: 
    * hostname: backend
    * port: 8000

* "Cannot read property 'menu_items' of undefined"
    * Add main menu
    * Add flat menu

* Spin up App
    1. git pull (master branch)
    2. docker-compose -f docker-compose.yml -f docker-compose.production.yml build
    3. docker-compose -f docker-compose.yml -f docker-compose.production.yml down
    4. docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
    5. docker system prune (keep it clean)

