const React = require('react');
/**
 * A read-only view of a neverwrote note.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props:
 */

const ActiveNotebookView = (props) => {
  return (
    <li className="neverwrote-note-title">
      <a role="button" title="Delete active notebook"
        style={{ paddingRight: '8px' }}
        onClick={ props.onDelete }
      >
        <span className="fa fa-remove" />
      </a>
      {props.notebook.title}
    </li>
  );
};

      /*
      <ul className="neverwrote-note-title">
        {props.notes.map(note => <li key={note.id}> {note.title} </li>)}
      </ul>
      */

module.exports = ActiveNotebookView;