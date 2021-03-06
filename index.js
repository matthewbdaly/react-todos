/*jslint node: true */
'use strict';

require('babel/register');

// Declare variables used
var app, base_url, bodyParser, express, hbs, mongoose, morgan, port, React, Todos, uristring;

// Define values
express = require('express');
app = express();
port = process.env.PORT || 5000;
base_url = process.env.BASE_URL || 'http://localhost:5000';
bodyParser = require('body-parser');
hbs = require('hbs');
morgan = require('morgan');
mongoose = require('mongoose');
uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/react-todos';
React = require('react');
Todos = React.createFactory(require('./components/todos.jsx'));

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

// Handle POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

// Serve static files
app.use(express.static(__dirname + '/static'));

// Define index route
app.get('/', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      var markup = React.renderToString(Todos({ data: todos }));
      res.render('index', {
        markup: markup,
        state: JSON.stringify(todos)
      });
    }
  });
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

// Create new todo
app.post('/todos', function (req, res) {
  // Get text
  var text = req.body.text;

  // Save it
  var newtodo = new Todo({ text: text });
  newtodo.save(function (err) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      Todo.find(function (err, todos) {
        if (err) {
          console.log('Error: ' + err);
        } else {
          res.status(201).json(todos);
        }
      });
    }
  });
});

// Delete an existing todo
app.delete('/todos/:id', function (req, res) {
  // Get ID
  var id = req.params.id;

  // Delete that todo
  Todo.remove({ _id: id }, function (err) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      Todo.find(function (err, todos) {
        if (err) {
          console.log('Error: ' + err);
        } else {
          res.status(200).json(todos);
        }
      });
    }
  });
});

// Listen
app.listen(port);
console.log("Listening on port " + port);
