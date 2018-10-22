const React = require('react');
const notesActionCreators = require('../reducers/notes');

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false,
                   activing: false, };
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    // check if box is currently opened
    const { activing } = this.state;
    this.setState({
      // toggle value of 'activing'
      activing: !activing,
    });
  }

  render() {

    const onClickThisNote = (event) => {
    	event.preventDefault();
      this.state = { activing: true };
    };

    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
    };

    const { activing } = this.state;

    return (
    <li className="neverwrote-note-title">
      <a role="button" title="Delete this note"
          style={{ paddingRight: '8px' }}
          onClick={ deleteThisNote }
      >
        <span className="btn btn-danger btn-sm" />
      </a>
      <a href="#" id="note-title" onClick={this.toggleBox}>
        {this.props.note.title}
      </a>
      {activing && ( <span id="note-content"> -- {this.props.note.content} </span> )}
    </li>
    );
  }
}

// Export the Notebook component
module.exports = Note;