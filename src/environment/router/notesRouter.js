const express = require('express')
var app = express()

module.exports = function (notesController) {
  app.get('/:session_id', (req, res) => {
    notesController.getNotesFromSession(req, res)
  })

  app.post('/', (req, res) => {
    notesController.addNewNoteToSession(req, res)
  })

  return app
}
