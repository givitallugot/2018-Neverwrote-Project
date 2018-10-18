const React = require('react');
const ReactRedux = require('react-redux');

const Notebook = require('./Notebook');
const ActiveNotebook = require('./ActiveNotebook');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

class NotebookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  render() {
    const createNotebookListItem = (notebook) => {
      if(notebook.id === this.props.activeNotebookId) {
      	return (
          <ActiveNotebook
            key={notebook.id}
            notebook={notebook}
            notes={this.props.notes}
          />
        );
      }
      return (
        <Notebook
          key={notebook.id}
          notebook={notebook}
          loadNotes={this.props.loadNotes}
        />
      );
    };

    return (
      <div>
        <h2>Notebooks</h2>
        <ul>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

// A version of the NotebookList component which is connected to the Redux store.
const NotebookListContainer = ReactRedux.connect(
  (state) => ({
    notebooks: state.notebooks,
    activeNotebookId: state.activeNotebookId,
    notes: state.notes,
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
