#!/bin/sh
npx prisma generate
npx prisma migrate dev --name init
ts-node prisma/seed.ts
nodemon -L --exec ts-node src/index.ts