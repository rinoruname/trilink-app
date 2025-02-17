# trilink-api
API repository - (Managed by Terraform)


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# seeding the database
$ npx ts-node src/main.ts --seed
```

## Environment Configuration

The Trilink project uses environment variables to configure application settings dynamically. These variables are stored in .env files to ensure flexibility across different environments (e.g., local, development, staging, production).

**.env.example** File
The `.env.example` file serves as a template for environment variables. It does not contain sensitive information but provides a reference for required configurations. Developers should copy this file and rename it to `.env`, then update values as needed.

Example `.env.example` file:

```bash
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=
PORT=
ENV=local
RUNS_ON=local
```

**.env** File
The `.env` file contains actual environment-specific configurations. This file should not be committed to version control to prevent exposing sensitive data. Instead, each developer or environment should maintain its own `.env` file with appropriate values.

Example `.env file` for local development:

```bash
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=trilink_db
POSTGRES_PORT=5432
PORT=4000
ENV=local
RUNS_ON=local
```

Environment Variables
- `POSTGRES_HOST`: Specifies the hostname or IP address where the PostgreSQL database is running.
- `POSTGRES_USER`: The username used to connect to the PostgreSQL database.
- `POSTGRES_PASSWORD`: The password for the PostgreSQL user.
- `POSTGRES_DB`: The name of the database used by the application.
- `POSTGRES_PORT`: The port number on which PostgreSQL is running (default: 5432).
- `PORT`: Defines the port on which the API service runs (e.g., 4000).
- `ENV`: Specifies the environment in which the application is running (local, development, staging, production).
- `RUNS_ON`: Indicates the deployment environment (local).