
# MOWO Spaces Wagtail Website


### Prerequisites (For Development)

* Docker

	* Windows: Docker Desktop 2.0+ on Windows 10 Pro/Enterprise. Windows 10 Home (2004+) requires Docker Desktop 2.2+ and the WSL2 back-end. (Docker Toolbox is not supported.)

	* macOS: Docker Desktop 2.0+.

	* Linux: Docker CE/EE 18.06+ and Docker Compose 1.21+. (The Ubuntu snap package is not supported.)

* Visual Studio Code Extension: `Remote - Containers`

### Development Setup

Then run this application in the `DEV Container`!

You also need to set your Auth0 Domain and the API's audience as environment variables with the following names respectively: `AUTH0_DOMAIN` and `API_IDENTIFIER`, which is the audience of your API. You can find an example in the

`env.example` file.

 
```bash

# .env file

API_IDENTIFIER=API_IDENTIFIER_NAME

POSTGRES_DB_NAME=POSTGRES_DATABASE_NAME

...

```

Once you've set the environment variables:

  

1. Install the needed dependencies with `pip install -r requirements.txt`

2. Migrate the database with `python manage.py migrate`

3. Start the server with `python manage.py runserver`

4. Try calling [http://localhost:8000/](http://localhost:8000/)
