#!/bin/bash

# Wait for MySQL to be available
echo "Waiting for MySQL to be available..."
until mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1;" $DB_NAME; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 3
done

# Create the database if it does not exist
echo "Creating the database if not exists..."
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Run migrations
echo "Running migrations..."
npx sequelize-cli db:migrate

# Start the backend service
echo "Starting backend..."
npm start
