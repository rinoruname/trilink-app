#!/bin/sh

# List available scripts
echo "Available npm scripts:"
npm run

# Skip migrations since tables exist
# echo "Running migrations..."
# npm run typeorm migration:run

# Run seeding
echo "Seeding database..."
npm run start:dev -- --seed

# Start the application
echo "Starting application..."
if [ "$ENV" = "development" ]; then
    npm run start:dev
else
    npm run start:prod
fi 