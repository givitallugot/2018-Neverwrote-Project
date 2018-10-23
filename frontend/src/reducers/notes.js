const _ = require('lodash');
const api = require('../helpers/api');

const notebooksActionsCreator = require('./notebooks');

// Action type constants
const INSERT = 'nevewrote/notes/INSERT';
const REMOVE = 'nevewrote/notes/REMOVE';
const UPDATE = 'nevewrote/notes/UPDATE';

const initialState = {
  notes : [

    ]
};

function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT: {
      const unsortedNotes = _.concat(state.notes, action.notes);
      const notes = _.orderBy(unsortedNotes, 'createdAt', 'desc');
      return _.assign({}, state, { notes } );
    }

    case REMOVE: {
      const notes = _.reject(state.notes, {id: action.id});
      return _.assign({}, state, { notes });
    }

    default: return state;
  }
}

reducer.insertNote = (notes) => {
  return { type: INSERT, notes };
};

// Action creators
reducer.createNote = (newNote, notebookId, callback) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((note) => {
      dispatch(reducer.insertNote(note));
      dispatch(notebooksActionsCreator.loadNotes(notebookId));
      callback();
    });
  };
};

reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};

reducer.deleteNote = (noteId, notebookId, callback) => {
   return (dispatch) => {
    api.delete('/notes/' + noteId).then((note) => {
      dispatch(reducer.removeNote(noteId));
      dispatch(notebooksActionsCreator.loadNotes(notebookId));
      callback();
    });
  };
};

// Export the action creators and reducer
module.exports = reducer;