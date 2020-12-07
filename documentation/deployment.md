# Deployment

This repository provides an application for deploying a Django backend served by Nginx/Gunicorn on port 8000, and a NuxtJS/Vuetify front end served by Node on port 80.


### Local (For Development)

* Wagail Site settings: 
    * hostname: localhost
    * port: 8000


### Production (For hHetzner)

* Create Postres DB
    * DB name
    * DB password

* Wagail Site settings: 
    * hostname: backend
    * port: 8000

* "Cannot read property 'menu_items' of undefined"
    * Add main menu
    * Add flat menu
