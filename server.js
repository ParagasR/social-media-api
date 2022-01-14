// get NPM packages
const express = require('express');
const morgan = require('morgan');

// get the routes that will be used in the server
const db = require('./config/connection');
const routes = require('./routes');

// set up server variables
const PORT = 3001;
const app = express();

// add some formatting to the terminal
app.use(morgan('tiny'));

// set up formats for the express and use middleware to redirect the routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//once the mongodb is running it will launch the server on the PORT
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`)
  })
})