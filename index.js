const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const appConfig = require('./appConfig');

// Services
const todoService = require('./services/Todo');

// Database initialization
data.initDatabase();
console.info("- Initializing Database");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
console.info("Initializing express");

// Enable downloadable contents
app.use('/contents',express.static(`${__dirname}/contents`));
console.info('Downloadable content route has been enabled');

// Route setups
app.post('/saveTodo', todoService.create);
app.get('/todos', todoService.getTodos);
app.get('/finishedTodos', todoService.getFinishedTodos);
app.delete('/delete/:id', todoService.delete);
console.info('Express routes have been configured');

// Run server
app.listen(appConfig.port);
console.info(`Server started at ${appConfig.port}`);