var React = require('react');
var $ = require('jquery');
var TodoForm = require('./form.jsx');
var TodoList = require('./todolist.jsx');

var Todos = React.createClass({
  loadTodosFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
  },
  render: function () {
    return (
      <div>
        <h1>React Todo</h1>
        <TodoForm />
        <TodoList />
      </div>
    );
  }
});

module.exports = Todos;