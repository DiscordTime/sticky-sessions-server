const express = require('express')
const NoteMapper = require('./mapper')

class NotesRouter {
  constructor (notesController) {
    this.notesController = notesController
    this.app = express()
    this.noteMapper = new NoteMapper()
  }

  getRoutes () {
    this.app.get('/:session_id/:user?', async (req, res) => {
      var note
      try {
        note = this.noteMapper.mapGetNotesToDomain(req)
      } catch (error) {
        res.status(400)
        res.send({ 'error': error })
        return
      }
      var response = await this.notesController.getNotesFromSession(note)

      if (response.message) {
        res.status(500)
        res.send({ 'error': response.message })
        return
      }

      res.send(response)
    })

    this.app.post('/', async (req, res) => {
      var note
      try {
        note = this.noteMapper.mapAddNoteToDomain(req)
      } catch (error) {
        res.status(400)
        res.send({ 'error': error })
        return
      }

      const response = await this.notesController.addNewNoteToSession(note)
      if (response.message) {
        res.status(500)
        res.send({ 'error': response.message })
        return
      }

      res.send(response)
    })

    this.app.delete('/:id', async (req, res) => {
      var note
      try {
        note = this.noteMapper.deleteNoteToDomain(req)
      } catch (error) {
        res.status(400)
        res.send({ 'error': error })
        return
      }

      const response = await this.notesController.deleteNote(note)

      if (response.message) {
        res.status(500)
        res.send({ 'error': response.message })
        return
      }

      res.send(response)
    })

    this.app.put('/:id', async (req, res) => {
      var note
      try {
        note = this.noteMapper.editNoteToDomain(req)
      } catch (error) {
        res.status(400)
        res.send({ 'error': error })
        return
      }

      const response = await this.notesController.editNote(note)

      if (response.message) {
        res.status(500)
        res.send({ 'error': response.message })
        return
      }

      res.send(response)
    })

    return this.app
  }
}

module.exports = NotesRouter
