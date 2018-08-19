const express = require('express')
var app = express()

module.exports = function (notesController) {
  app.get('/:sessionId', (req, res) => {
    notesController.getNotesFromSession(req, res)
  })

  app.post('/', (req, res) => {
    notesController.addNewNoteToSession(req, res)
  })

  return app
}
