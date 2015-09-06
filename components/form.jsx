var React = require('react');

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.props.onTodoSubmit({text: text});
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function () {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your todo item" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
