var React = require('react');

var TodoItem = React.createClass({
  handleDelete: function (e) {
    e.preventDefault();
    var id = this.props.id;
    console.log(id);
  },
  render: function () {
    return (
      <li>{this.props.text}<a className="delete" data-itemid={this.props.id} onClick={this.handleDelete}>X</a></li>
    );
  }
});

module.exports = TodoItem;
