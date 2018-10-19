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
    <li className="neverwrote-note-title">>
        {props.notebook.title}
        <ul className="neverwrote-note-title">
           {this.props.notes.map(note => <li> {note.title} </li>)}
        </ul>
    </li>
  );
};

module.exports = ActiveNotebookView;