const React = require('react');
const _ = require('lodash');

class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);
    const notebook = props.notebook || {};

    this.state = {
      title: notebook.title || ''
    };
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
      <form className="neverwrote-notebook-add-form">
        {/* Title field */}
        <div className="form-group">
          <input id="notebook-title" className="form-control input-lg" value={this.state.title}
            placeholder="Notebook title" onChange={onTitleChange}
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

module.exports = NotebookEdit;