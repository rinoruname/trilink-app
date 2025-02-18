# Trilink Project Documentation

## Recent Changes & Fixes

### 1. Asset Loading Issues
Fixed issues with Next.js static assets loading from incorrect domain (assets.trilink.dev).

#### Changes Made:
- Modified `next.config.ts` to use localhost for assets
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix: process.env.ENV === 'local' ? '' : "http://localhost"
};
```

- Updated nginx configuration to handle asset redirects:
```nginx
# Rewrite any external asset URLs to local paths
rewrite ^/https://assets\.trilink\.dev/_next/(.*)$ /_next/$1 permanent;
rewrite ^/assets\.trilink\.dev/_next/(.*)$ /_next/$1 permanent;
rewrite ^/[^/]+\.[^/]+/_next/(.*)$ /_next/$1 permanent;

# Handle all Next.js static files
location /_next/static/ {
    alias /usr/share/nginx/html/_next/static/;
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $uri $uri/ =404;
}
```

### 2. Docker Compose Configurations

#### Production Build (docker-compose.yml)
```yaml
trilink-web:
  build:
    context: ./trilink-web
    dockerfile: Dockerfile
  environment:
    - ENV=local
    - NODE_ENV=development
```

#### Testing Published Images (docker-compose-test.yml)
```yaml
trilink-web:
  image: rinoruname/trilink-web:latest
  environment:
    - ENV=local
    - NODE_ENV=development
```

### 3. GitHub Actions Workflows

#### Web Build Workflow
```yaml
- name: Build static assets
  working-directory: trilink-web
  env:
    ENV: local
    NEXT_PUBLIC_API_URL: http://localhost:4000
    NEXT_PUBLIC_ASSET_PREFIX: ''
  run: npm run build
```

## Project Structure

### API Service
- Port: 4000
- Dependencies: PostgreSQL
- Health Check: /blogs endpoint

### Web Service
- Port: 80
- Dependencies: API Service
- Static Assets: Served locally via nginx

### Database
- PostgreSQL 15
- Initial setup via init.sql

## Running the Project

### Local Development
```bash
docker-compose up -d
```

### Testing Published Images
```bash
docker-compose -f docker-compose-test.yml up -d
```

## Environment Variables

### API Service
- POSTGRES_HOST
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
- PORT
- ENV
- RUNS_ON
- CORS_ORIGIN

### Web Service
- NEXT_PUBLIC_API_URL
- API_URL
- ENV
- NODE_ENV

## Network Configuration
- All services run on 'app-network'
- API accessible at http://localhost:4000
- Web accessible at http://localhost:80

## Build Process
1. GitHub Actions builds images on push to main
2. Images are published to DockerHub
3. Local testing can use docker-compose-test.yml to pull published images

## Common Issues & Solutions

### Asset Loading
If assets fail to load:
1. Check ENV is set to 'local'
2. Verify nginx configuration
3. Check network connectivity between services

### Database Connection
If database fails:
1. Wait for PostgreSQL health check
2. Verify database credentials
3. Check network connectivity

## Deployment Notes
- Images are tagged with commit SHA and 'latest'
- Health checks ensure proper service startup order
- Static assets are served directly from nginx 

## TypeScript and Linting Setup

### Next.js TypeScript Configuration
1. Install required dependencies:
```bash
npm install --save-dev typescript @types/node @types/react @types/react-dom
```

2. Fix next.config.ts type errors:
```typescript
import type { NextConfig } from "next";

// Ensure @types/node is installed for process.env
const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix: process.env.ENV === 'local' ? '' : "http://localhost"
};

export default nextConfig;
```

### GitHub Actions TypeScript Setup
The workflow installs types before building:
```yaml
- name: Install dependencies
  working-directory: trilink-web
  run: npm install

- name: Install types
  working-directory: trilink-web
  run: npm install --save-dev @types/node

- name: Build static assets
  working-directory: trilink-web
  env:
    ENV: local
    NEXT_PUBLIC_API_URL: http://localhost:4000
    NEXT_PUBLIC_ASSET_PREFIX: ''
  run: npm run build
```

## Troubleshooting

### TypeScript Errors
If you see errors like:
- "Cannot find module 'next'"
- "Cannot find name 'process'"

Fix by running:
```bash
cd trilink-web
npm install --save-dev typescript @types/node @types/react @types/react-dom
```

### Asset Loading Issues
Common error patterns:
```
GET https://assets.trilink.dev/_next/static/chunks/... net::ERR_NAME_NOT_RESOLVED
```
Fix by:
1. Setting ENV=local
2. Using nginx rewrites
3. Ensuring next.config.ts uses correct assetPrefix

### Build Process Validation
The build process includes:
1. TypeScript compilation
2. Next.js static asset generation
3. Docker image building
4. Health checks before deployment 