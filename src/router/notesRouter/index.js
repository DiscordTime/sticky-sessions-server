const express = require('express')

class NotesRouter {
  constructor (notesController) {
    this.notesController = notesController
    this.app = express()
  }

  getRoutes () {
    this.app.get('/:session_id/:user?', (req, res) => {
      this.notesController.getNotesFromSession(req, res)
    })

    this.app.post('/', (req, res) => {
      this.notesController.addNewNoteToSession(req, res)
    })

    this.app.delete('/:note_id', (req, res) => {
      this.notesController.deleteNote(req, res)
    })

    this.app.post('/edit', (req, res) => {
      this.notesController.editNote(req, res)
    })

    return this.app
  }
}

module.exports = NotesRouter
