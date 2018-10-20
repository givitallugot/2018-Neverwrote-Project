const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT = 'nevewrote/notebooks/notes/INSERT';
const REMOVE = 'nevewrote/notebooks/notes/REMOVE';
const UPDATE = 'nevewrote/notebooks/notes/UPDATE';

function reducer(state, action) {
  state = state || {};
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    default: return state;
  }
}

// Action creators
reducer.createNotes = (newNote) => {
  return (dispatch) => {
    api.post('/notebooks', newNote).then((note) => {
      dispatch(reducer.insertNotes([note]));
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;