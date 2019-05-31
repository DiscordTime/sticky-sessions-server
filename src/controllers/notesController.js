const Joi = require('joi')

var dataCallback = function (err, data, res) {
  if (err) {
    res.status(503)
    res.send(err)
    return
  }
  res.send(data)
}

function getFullNoteJoiSchema () {
  return getDefaultJoiNoteSchema().concat(Joi.object({
    id: Joi.string().required()
  }))
}

function getDefaultJoiNoteSchema () {
  return Joi.object().keys({
    description: Joi.string().required().max(100),
    user: Joi.string().required(),
    session_id: Joi.string().required(),
    topic: Joi.string().required()
  })
}

function getDefaultNoteFromRequest (req) {
  return {
    description: req.body.description,
    user: req.body.user,
    session_id: req.body.session_id,
    topic: req.body.topic
  }
}

class NotesController {
  constructor (notesRepository) {
    this.notesRepository = notesRepository
  }

  getNotesFromSession (sessionId, user) {
    this.notesRepository.getNotes(sessionId, user)
  }

  async addNewNoteToSession (note) {
    return await this.notesRepository.addNewNoteToSession(note)
  }

  deleteNote (req, res) {
    const noteId = req.params.note_id
    this.proxy.deleteNote(noteId, (err, resp) => {
      if (err) {
        res.status(503)
        res.send(err)
        return
      }
      res.send(resp)
    })
  }

  editNote (req, res) {
    const schema = getFullNoteJoiSchema()
    const note = req.body
    const { error, value } = Joi.validate(note, schema)
    if (error) {
      res.status(400)
      res.send(error)
    } else {
      this.proxy.editNote(value, (err, returnedNote) => {
        dataCallback(err, returnedNote, res)
      })
    }
  }
}

module.exports = NotesController
