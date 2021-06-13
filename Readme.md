## Local development

###  Requirements
 - Local nodejs instalation
 - Running MongoDb instance
 - Set GITHUB_TOKEN and FRESHDESK_TOKEN environment variables in the `src/config.js` file

You can locally run the project by executing

    npm install
    npm run start:dev


## Run with Docker
Simply execute the following and MongoDb and Nodejs containers will be created

    docker-compose up -d

> Warning: Make sure that any other service is using the port 5000 on your computer

