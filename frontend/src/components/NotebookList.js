const React = require('react');
const ReactRedux = require('react-redux');

const NoteList = require('./NoteList');

const Notebook = require('./Notebook');
const ActiveNotebook = require('./ActiveNotebook');
const NotebookNew = require('./NotebookNew');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');

class NotebookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activing: false };
  }

  render() {

    const createNotebookComponent = (notebook) => {
      if(notebook.id === this.props.notebooks.activeNotebookId) {
      	return (
            <ActiveNotebook
              key={notebook.id}
              notebook={notebook}
              notes={this.props.notebooks.notes}
              deleteNotebook={this.props.deleteNotebook}
            />
        );
      }
      return (
        <Notebook
          key={notebook.id}
          notebook={notebook}
          loadNotes={this.props.loadNotes}
          deleteNotebook={this.props.deleteNotebook}
        />
      );
    };

    return (
      <div className="neverwrote-notebook-div">
        <h2>Notebooks</h2>
        <NotebookNew
          createNotebook={this.props.createNotebook}
        />
        
        <ul>
          {this.props.notebooks.data.map(createNotebookComponent)}
        </ul>

        <NoteList
          notebooks={this.props.notebooks}
          notes={this.props.notebooks.notes}
        />
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