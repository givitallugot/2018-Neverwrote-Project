const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
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

  	case UPDATE: {
    	return _.assign({}, state, { activeNotebookId: action.notebookId, notes: action.notes });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.loadNotes = (notebookId, callback) => {

	return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      console.log(JSON.stringify(console.log(notes)));
      dispatch({ type: UPDATE, notebookId, notes });
      callback();
    }).catch(() => {
      alert('Failed to get notes.');
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;