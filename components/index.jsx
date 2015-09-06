var React = require('react');
var Todos = require('./todos.jsx');

React.render(
  <Todos url="todos.json" />,
  document.getElementById('view')
);
