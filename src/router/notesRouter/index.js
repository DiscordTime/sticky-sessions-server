const express = require('express')
const NoteMapper = require('./mapper')

class NotesRouter {
  constructor (notesController) {
    this.notesController = notesController
    this.app = express()
    this.noteMapper = new NoteMapper()
  }

  getRoutes () {
    this.app.get('/:session_id/:user?', (req, res) => {
      this.notesController.getNotesFromSession(req, res)
    })

    this.app.post('/', async (req, res) => {
      const note = this.noteMapper.mapFromRouteToDomain(req)
      if (!note.isValid()) {
        res.status(400)
        res.send({ 'error': note.getValidationError() })
        return
      }

      const response = await this.notesController.addNewNoteToSession(note.getNote())
      if (response.message) {
        res.status(500)
        res.send({ 'error': response.message })
        return
      }

      res.send(response)
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
