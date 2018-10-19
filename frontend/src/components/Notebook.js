const React = require('react');

const NotebookView = require('./NotebookView');

class Notebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Activing: false };
  }

  render() {
  	const onClickNotebook = (event) => {
    	event.preventDefault();
    	this.props.loadNotes(this.props.notebook.id);
      this.setState({ Activing: true });
    };

    //Put edit here

    // Render read-only view of the post
    return (
      <NotebookView
        //key={notebook.id}
        notebook={this.props.notebook}
        notebookClick={onClickNotebook}
      />
    );
  }
}

// Export the Notebook component
module.exports = Notebook;