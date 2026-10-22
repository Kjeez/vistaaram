#!/bin/sh
# Applies pending database migrations, then starts Medusa.
set -e

echo "Running database migrations..."
npx medusa db:migrate

echo "Starting Medusa..."
exec npx medusa start
