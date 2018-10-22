const React = require('react');
const NoteEdit = require('./NoteEdit');

class NoteNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

    if(this.state.editing) {
      return (
        <NoteEdit
          note={this.props.note}
          activeNotebookId={this.props.activeNotebookId}
          onSave={createNote}
          onCancel={closeEdit}
        />
      );
    }

    return (
      <div>
      <button id="neverwrote-new" className="btn btn-lg btn-md" onClick={openEdit}>+ new note</button>
      </div>
    );
  }
}

module.exports = NoteNew;