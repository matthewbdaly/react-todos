var React = require('react');
var TodoItem = require('./item.jsx');

var TodoList = React.createClass({
  render: function () {
    return (
      <ul className="todos">
      </ul>
    );
  }
});

module.exports = TodoList;
