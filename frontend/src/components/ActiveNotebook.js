const React = require('react');

const NotebookView = require('./NotebookView');
const NoteView = require('./NoteView');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {

    //Put edit here

    // Render read-only view of the post
    return (
      <NotebookView
        notebook={this.props.notebook}
        note={this.props.note} //?How can i bring notes??
      />
    );
  }
}

// Export the Notebook component
module.exports = ActiveNotebook;