const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
const INSERT = 'nevewrote/notebooks/INSERT';
const REMOVE = 'nevewrote/notebooks/REMOVE';
const UPDATE = 'nevewrote/notebooks/UPDATE';
const RELOAD = 'nevewrote/notebooks/RELOAD';

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ],
  activeNotebookId: -1,
  notes : []
};

// Function which takes the current data state and an action, and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* Put per-action code */
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

    case RELOAD: {
      return _.assign({}, state, { data: action.notebooks });
    }

    default: return state;
  }
}

// Action creators
reducer.loadNotebooks = (callback) => {
	return (dispatch) => {
    api.get('/notebooks').then((notebooks) => {
      dispatch({ type: RELOAD, notebooks });
      callback();
    });
  };
};

reducer.loadNotes = (notebookId, callback) => {
	return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      console.log(JSON.stringify(console.log(notes)));
      dispatch({ type: UPDATE, notebookId, notes });
      callback();
    });
  };
};

reducer.insertNotebook = (notebooks) => {
  return { type: INSERT, notebooks };
};

reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      dispatch({ type: INSERT, notebook});
      dispatch(reducer.loadNotebooks());
      callback();
    });
  };
};

reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

reducer.deleteNotebook = (notebookId, callback) => {
   return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then((notebook) => {
      dispatch(reducer.removeNotebook(notebook));
      dispatch(reducer.loadNotebooks());
      callback();
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;