const React = require('react');
const ReactRedux = require('react-redux');

const Note = require('./Note');
const NoteNew = require('./NoteNew');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notesActionCreators = require('../reducers/notes');

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { activing: false };
  }
  render() {

    const createNoteComponent = (note) => {
      return (
        <Note
          key={note.id}
          note={note}
          deleteNote={this.props.deleteNote}
        />
      );
    };

    return (
      <div className="neverwrote-note-div">
        <h2 className="neverwrote-note-header">Notes</h2>

        <NoteNew
          createNote={this.props.createNote}
          activeNotebookId={this.props.activeNotebookId}
        />

        <ul className="neverwrote-note-title">
          {this.props.notebooks.notes.map(createNoteComponent)}
        </ul>
      </div>
    );
 }
}

// A version of the NoteList component which is connected to the Redux store.
const NoteListContainer = ReactRedux.connect(
  (state) => ({
    notes: state.notes
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;
