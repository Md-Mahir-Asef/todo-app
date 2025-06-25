#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until nc -z db 5432; do
  echo "Postgres is unavailable."
  sleep 1
done

echo "Postgres is up - running Prisma..."
npx prisma generate
npx prisma migrate dev --name init

echo "Starting server..."
nodemon -L --exec ts-node src/index.ts
