const React = require('react');

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    return (
    <li className="neverwrote-note-title">
      <a role="button" title="Delete this note"
          style={{ paddingRight: '8px' }}
      >
        <span className="fa fa-remove" />
      </a>
      <a href="#">
        {this.props.note.title}
      </a>
    </li>
    );
  }
}

// Export the Notebook component
module.exports = Note;