var React = require('react');
var TodoItem = require('./item.jsx');

var TodoList = React.createClass({
  render: function () {
    var todoNodes = this.props.data.map(function (item, index) {
      return (
        <TodoItem text={item.text} key={index}></TodoItem>
      );
    });
    return (
      <ul className="todos">
        {todoNodes}
      </ul>
    );
  }
});

module.exports = TodoList;
