var React = require('react');
var Todos = require('./todos.jsx');

React.render(
  <Todos url="/todos" />,
  document.getElementById('view')
);
