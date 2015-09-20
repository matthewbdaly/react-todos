var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var TodoForm = require('./form.jsx');
var TodoList = require('./todolist.jsx');

var Todos = React.createClass({
  handleTodoDeleteParent: function (item) {
    var that = this;
    var todos = this.props.data;
    todos = _.filter(todos, function (obj) {
      return obj._id !== item.id;
    });
    this.setProps({data: todos}, function () {
      $.ajax({
        url: this.props.url + '/' + item.id,
        dataType: 'json',
        type: 'DELETE',
        success: function (data) {
          this.setProps({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  handleTodoSubmit: function (todo) {
    var todos = this.props.data;
    todos.push(todo);
    this.setProps({data: todos}, function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: todo,
        success: function (data) {
          this.setProps({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function () {
    return {data: this.props.data};
  },
  render: function () {
    return (
      <div>
        <h1>React Todo</h1>
        <TodoForm onTodoSubmit={this.handleTodoSubmit} />
        <TodoList onTodoDeleteParent={this.handleTodoDeleteParent} data={this.props.data} />
      </div>
    );
  }
});

module.exports = Todos;
