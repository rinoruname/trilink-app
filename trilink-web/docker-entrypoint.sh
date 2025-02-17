#!/bin/sh

# Start Next.js in background
cd /app && npm run start &

# Start nginx in foreground
nginx -g 'daemon off;' 