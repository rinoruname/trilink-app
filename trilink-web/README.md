# trilink-web

Web client repository - (Managed by Terraform)

## Project setup

```bash
$ npm install
```


## Run the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Environment Configuration

The Trilink project uses environment variables to configure application settings dynamically. These variables are stored in .env files to ensure flexibility across different environments (e.g., local, development, staging, production).

**.env.example** File
The `.env.example` file serves as a template for environment variables. It does not contain sensitive information but provides a reference for required configurations. Developers should copy this file and rename it to `.env`, then update values as needed.

Example `.env.example` file:

```bash
API_URL=http://localhost:4000
ENV=local
```

**.env** File
The `.env` file contains actual environment-specific configurations. This file should not be committed to version control to prevent exposing sensitive data. Instead, each developer or environment should maintain its own `.env` file with appropriate values.

Example `.env file` for local development:

```bash
API_URL=http://localhost:4000
ENV=local
```

Environment Variables
 - `API_URL`: Specifies the backend API's base URL. In a local setup, it points to http://localhost:4000. In production, this value should be updated to the deployed API's URL.
 - `ENV`: Defines the current environment (local, staging, production). It can be used for environment-specific logic in the application.