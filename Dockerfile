FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app/
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "npm", "start" ]
