var React = require('react');
var TodoForm = require('./form.jsx');

React.render(
  <div>
    <h1>React Todo</h1>
    <ul className="todos">
    </ul>
  </div>,
  document.getElementById('view')
);
