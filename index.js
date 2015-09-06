/*jslint node: true */
'use strict';

// Declare variables used
var app, base_url, express, hbs, mongoose, morgan, port, uristring;

// Define values
express = require('express');
app = express();
port = process.env.PORT || 5000;
base_url = process.env.BASE_URL || 'http://localhost:5000';
hbs = require('hbs');
morgan = require('morgan');
mongoose = require('mongoose');
uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/react-todos';

// Connect to the database
mongoose.connect(uristring);

// Create a model for the todos
var TodoSchema = mongoose.Schema({
  text: {
    type: String,
    match: /^(\w+)/
  }
});
var Todo = mongoose.model('Todo', TodoSchema);

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "hbs");
app.engine('hbs', require('hbs').__express);

// Set up logging
app.use(morgan('combined'));

// Set URL
app.set('base_url', base_url);

// Serve static files
app.use(express.static(__dirname + '/static'));

// Define index route
app.get('/', function (req, res) {
  res.render('index');
});

// Define todos route
app.get('/todos', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      res.json(todos);
    }
  });
});

// Listen
app.listen(port);
console.log("Listening on port " + port);
