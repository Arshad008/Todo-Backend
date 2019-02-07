const express = require('express');
const data = require('./data');
const appConfig = require('./appConfig');

// Services
const todoService = require('./services/Todo');

// Database initialization
data.initDatabase();
console.info("- Initializing Database");

const app = express();
app.use(express.json());
console.info("Initializing express");

// Enable downloadable contents
app.use('/contents',express.static(`${__dirname}/contents`));
console.info('Downloadable content route has been enabled');



// Run server
app.listen(appConfig.port);
console.info(`Server started at ${appConfig.port}`);