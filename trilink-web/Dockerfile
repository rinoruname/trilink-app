# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Force Next.js to use localhost for assets during build
ENV NEXT_PUBLIC_ASSET_PREFIX=http://localhost
ENV NEXT_PUBLIC_API_URL=http://localhost:4000

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built next.js application
COPY --from=builder /app/.next /usr/share/nginx/html/_next
COPY --from=builder /app/public /usr/share/nginx/html

# Install Node.js in nginx container
RUN apk add --no-cache nodejs npm

# Copy package.json and next.js server files
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/.next /app/.next/
COPY --from=builder /app/public /app/public/
COPY --from=builder /app/node_modules /app/node_modules/

# Start both nginx and next.js
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"] 