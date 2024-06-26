FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=prod
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY src src

EXPOSE 5000
CMD ["npm", "start"]
