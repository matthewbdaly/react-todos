var React = require('react');
var TodoForm = require('./form.jsx');

var List = React.createClass({
  render: function () {
    return (
      <div>
        <h1>React Todo</h1>
        <TodoForm />
        <ul className="todos">
        </ul>
      </div>
    );
  }
});

module.exports = List;
