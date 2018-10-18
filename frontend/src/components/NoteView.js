const React = require('react');
/**
 * A read-only view of a neverwrote note.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props:
 */
const NoteView = (props) => {
  return (
    <li className="neverwrote-note-title">>
        {props.note.title}
        <ol className="neverwrote-note-content">
           {this.props.notes.map(note => <li key={note.id}> {props.note.content} </li>)}
         </ol>
    </li>
  );
};

module.exports = NoteView;