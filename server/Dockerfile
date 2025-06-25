FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash netcat-openbsd
RUN npm install -g nodemon

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install 

COPY . .

EXPOSE 8000
EXPOSE 4000

ENTRYPOINT [ "./entrypoint.sh" ]
