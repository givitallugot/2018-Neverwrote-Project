const React = require('react');

const ActiveNotebookView = require('./ActiveNotebookView');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Activing: true };
  }

  render() {

    //Put edit here

    // Render read-only view of the post
    return (
      <ActiveNotebookView
        //key={notebook.id}
        notebook={this.props.notebook}
        notes={this.props.notes}
      />
    );
  }
}

// Export the Notebook component
module.exports = ActiveNotebook;