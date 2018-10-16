const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// + Selects only the fields that are allowed to be set by users + notebookID?
function noteFilter(obj) {
  return _.pick(obj, ['notebookId', 'title', 'content']);
}

// + Index: GET/notes
router.get('/', (req, res) => {
  models.Note.findAll({ order: [['createdAt', 'DESC']] })
  .then(notes => res.json(notes))
  .catch(err => res.status(500).json({ error: err.message }));
});

// + Create: POST/notes
router.post('/', (req, res) => {
  models.Note.create(noteFilter(req.body))
  .then(note => res.json(note))
  .catch(err => res.status(422).json({ error: err.message }));
});

// + Show: GET/notes/:noteId
router.get('/:noteId', (req, res) => {
  models.Note.findById(req.params.noteId)
  .then(note => res.json(note))
  .catch(err => res.status(500).json({ error: err.message }));
});

// + Delete: DELETE/notes/:noteId
router.delete('/:noteId', (req, res) => {
  models.Note.destroy({ where: { id: req.params.noteId } })
  .then(() => res.json({}))
  .catch(err => res.status(500).json({ error: err.message }));
});

// + Update: PUT/notes/:noteId
router.put('/:noteId', (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.update(noteFilter(req.body)))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;
