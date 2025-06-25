#!/bin/sh
npx prisma generate
npx prisma migrate dev --name init
nodemon -L --exec ts-node src/index.ts
