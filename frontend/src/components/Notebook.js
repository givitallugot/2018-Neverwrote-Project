const React = require('react');

const NotebookEdit = require('./NotebookEdit');
const NotebookView = require('./NotebookView');

const NoteNew = require('./NoteNew');

class Notebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    const onClickThisNotebook = (event) => {
    	event.preventDefault();
    	this.props.loadNotes(this.props.notebook.id);
      this.setState({ activing: true });
    };

    const deleteThisNotebook = () => {
      this.props.deleteNotebook(this.props.notebook.id);
    };

    return (
      <NotebookView
        key={this.props.notebook.id}
        notebook={this.props.notebook}
        onClickNotebook={onClickThisNotebook}
        onDelete={deleteThisNotebook}
      />
    );
  }
}

// Export the Notebook component
module.exports = Notebook;