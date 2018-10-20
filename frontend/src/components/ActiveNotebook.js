const React = require('react');

const ActiveNotebookView = require('./ActiveNotebookView');
const NoteList = require('./NoteList');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {

    const deleteActiveNotebook = () => {
      this.props.deleteNotebook(this.props.notebook.id);
    };

    // Render read-only view of the post
    return (
      <ActiveNotebookView
        key={this.props.notebook.id}
        notebook={this.props.notebook}
        notes={this.props.notes}
        onDelete={deleteActiveNotebook}
      />
    );
  }
}

// Export the Notebook component
module.exports = ActiveNotebook;