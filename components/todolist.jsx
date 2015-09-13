var React = require('react');
var TodoItem = require('./item.jsx');

var TodoList = React.createClass({
  handleTodoDelete: function (item) {
    this.props.onTodoDeleteParent({ id: item.id });
  },
  render: function () {
    var that = this;
    var todoNodes = this.props.data.map(function (item, index) {
      return (
        <TodoItem text={item.text} id={item._id} key={index} onTodoDelete={that.handleTodoDelete}></TodoItem>
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
