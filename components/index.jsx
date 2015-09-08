var React = require('react');
var Todos = require('./todos.jsx');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

React.render(
  <Todos url="/todos" data={initialState} />,
  document.getElementById('view')
);
