const express = require('express')
const NoteMapper = require('./noteMapper')
const Router = require('../router')

class NotesRouter {
  constructor (notesController) {
    this.notesController = notesController
    this.app = express()
    this.noteMapper = new NoteMapper()
    this.genericRouter = new Router(this.noteMapper)
  }

  getRoutes () {
    this.app.get('/', (req, res) => {
      this.genericRouter.execute(
        this.notesController.getNotesFromSession.bind(this.notesController),
        this.noteMapper.mapGetNotesFromSession.bind(this.noteMapper),
        req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.execute(
        this.notesController.addNewNoteToSession.bind(this.notesController),
        this.noteMapper.mapAddNoteToDomain.bind(this.noteMapper),
        req, res)
    })

    this.app.delete('/:id', (req, res) => {
      this.genericRouter.execute(
        this.notesController.deleteNote.bind(this.notesController),
        this.noteMapper.mapDeleteNoteToDomain.bind(this.noteMapper),
        req, res)
    })

    this.app.put('/:id', async (req, res) => {
      this.genericRouter.execute(
        this.notesController.editNote.bind(this.notesController),
        this.noteMapper.mapEditNoteToDomain.bind(this.noteMapper),
        req, res)
    })

    return this.app
  }
}

module.exports = NotesRouter
