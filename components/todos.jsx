var React = require('react');
var $ = require('jquery');
var TodoForm = require('./form.jsx');
var TodoList = require('./todolist.jsx');

var Todos = React.createClass({
  handleTodoSubmit: function (todo) {
    var todos = this.state.data;
    todos.push(todo);
    this.setState({data: todos}, function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: todo,
        success: function (data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: this.props.data};
  },
  render: function () {
    return (
      <div>
        <h1>React Todo</h1>
        <TodoForm onTodoSubmit={this.handleTodoSubmit} />
        <TodoList data={this.state.data} />
      </div>
    );
  }
});

module.exports = Todos;
