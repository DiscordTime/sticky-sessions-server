const express = require('express')
var app = express()

module.exports = function (notesController) {
  app.get('/:session_id/:user?', (req, res) => {
    notesController.getNotesFromSession(req, res)
  })

  app.post('/', (req, res) => {
    notesController.addNewNoteToSession(req, res)
  })

  app.delete('/:note_id', (req, res) => {
    notesController.deleteNote(req, res)
  })

  app.post('/edit', (req, res) => {
    notesController.editNote(req, res)
  })

  return app
}
