# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY package-lock.json ./


# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_HOSTNAME
ARG DB_PORT

ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV DB_HOSTNAME=$DB_HOSTNAME
ENV DB_PORT=$DB_PORT

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

# Start the server using the production build
CMD [ "npm", "start" ]