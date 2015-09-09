var React = require('react');

var TodoItem = React.createClass({
  render: function () {
    return (
      <li data-itemid={this.props.id}>{this.props.text}<a className="delete">X</a></li>
    );
  }
});

module.exports = TodoItem;
