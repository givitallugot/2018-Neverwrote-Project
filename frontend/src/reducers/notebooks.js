const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT = 'nevewrote/notebooks/INSERT';
const REMOVE = 'nevewrote/notebooks/REMOVE';
const UPDATE = 'nevewrote/notebooks/UPDATE';

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ],
  activeNotebookId: -1,
  notes : []
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT: {
      const unsortedNotebooks = _.concat(state.data, action.notebooks);
      const data = _.orderBy(unsortedNotebooks, 'createdAt','desc');
      return _.assign({}, state, { data } );
    }

    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, { data });
    }

  	case UPDATE: {
    	return _.assign({}, state, { activeNotebookId: action.notebookId, notes: action.notes });
    }

    default: return state;
  }
}

// Action creators
reducer.loadNotes = (notebookId) => {
	return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      console.log(JSON.stringify(console.log(notes)));
      dispatch({ type: UPDATE, notebookId, notes });
    })
  };
};

reducer.insertNotebook = (notebooks) => {
  return { type: INSERT, notebooks };
};

reducer.createNotebook = (newNotebook) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      dispatch(reducer.insertNotebook([notebook]));
    });
  };
};

reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

reducer.deleteNotebook = (notebookId) => {
   return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then((notebook) => {
      dispatch(reducer.removeNotebook(notebook));
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;