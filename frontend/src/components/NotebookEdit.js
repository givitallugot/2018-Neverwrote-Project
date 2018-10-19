const React = require('react');
const _ = require('lodash');

class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);
    const notebook = props.notebook || {};

    this.state = {
      title: notebook.title || ''
    }; //note..?
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      const editedNotebook = _.assign({}, this.props.notebook, {
        title: this.state.title
      });
      this.props.onSave(editedNotebook);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    return (
      <form className="neverwrote-notebook-form">
        {/* Title field */}
        <div className="neverwrote-notebook-form-title">
          <input className="neverwrote-notebook-form-title-input" value={this.state.title}
            placeholder="Notebook title" onChange={onTitleChange}
          />
        </div>

        {/* Save button */}
        <button className="neverwrote-notebook-form-save"
          onClick={submitAndStopEditing}
        >
          Save
        </button>

        {/* Cancel button */}
        <button className="neverwrote-notebook-form-cancel"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}
        >
          Cancel
        </button>
      </form>
    );
  }
}

module.exports = NotebookEdit;