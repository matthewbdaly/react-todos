var React = require('react');
var List = require('./list.jsx');

React.render(
  <List url="todos.json" />,
  document.getElementById('view')
);
