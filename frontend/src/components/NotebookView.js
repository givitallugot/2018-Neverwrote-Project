const React = require('react');
/**
 * A read-only view of a neverwrote notebook.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props:
 */
const NotebookView = (props) => {
  return (
    <li className="neverwrote-notebook-title">
      <a role="button" title="Delete this notebook"
          style={{ paddingRight: '8px' }}
          onClick={ props.onDelete }
      >
        <span className="btn btn-danger btn-sm" />
      </a>
      <a href="#" onClick={ props.onClickNotebook } >
        {props.notebook.title}
      </a>
    </li>
  );
};

module.exports = NotebookView;