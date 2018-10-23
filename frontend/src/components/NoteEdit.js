const React = require('react');
const _ = require('lodash');

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note || {};

    this.state = {
      notebookId: this.props.activeNotebookId || 100,
      title: note.title || '',
      content: note.content || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      const editedNote = _.assign({}, this.props.note, {
        notebookId: this.state.notebookId,
        title: this.state.title,
        content: this.state.content
      });
      this.props.onSave(editedNote);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };
////////////////////////////////////////
    const onContentChange = (event) => {
      this.setState({ content: event.target.value });
    };

    return (
      <form className="neverwrote-note-add-form">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Note title" onChange={onTitleChange}
          />
        </div>

        {/* Content field */}
        <div className="form-group">
          <textarea
            className="form-control"
            style={{ height: 300 }}
            value={this.state.content}
            onChange={onContentChange}
          />
        </div>

        {/* Cancel button */}
        <button id="button-cancel" className="btn btn-default pull-right"
          style={{ marginRight: '0px' }}
          onClick={revertAndStopEditing}
        >
          Cancel
        </button>

        {/* Save button */}
        <button id="button-save" className="btn btn-default pull-right"
          onClick={submitAndStopEditing}
        >
          Save
        </button>

      </form>
    );
  }
}

module.exports = NoteEdit;