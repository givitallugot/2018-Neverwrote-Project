const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// + Selects only the fields that are allowed to be set by users
function notebookFilter(obj) {
  return _.pick(obj, ['title']);
}

// Index: GET/notebooks
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

// + Create: POST/notebooks
router.post('/', (req, res) => {
  models.Notebook.create(notebookFilter(req.body))
  .then(notebook => res.json(notebook))
  .catch(err => res.status(422).json({ error: err.message }));
});

// + Show: GET/notebooks/:notebookId
router.get('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
  .then(notebook => res.json(notebook))
  .catch(err => res.status(500).json({ error: err.message }));
});

// + Show: GET/notebooks/:notebookId/notes
router.get('/:notebookId/notes', (req, res) => {
  models.Note.findAll({ where: { notebookId: req.params.notebookId} })
  .then(note => res.json(note))
  .catch(err => res.status(500).json({ error: err.message }));
});

// + Delete: DELETE/notebooks/:notebookId
router.delete('/:notebookId', (req, res) => {
  models.Notebook.destroy({ where: { id: req.params.notebookId } })
  .then(() => res.json({}))
  .catch(err => res.status(500).json({ error: err.message }));
});

// + Update: PUT/notebooks/:notebookId
router.put('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.update(notebookFilter(req.body)))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;
