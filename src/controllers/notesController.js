const Joi = require('joi')

var dataCallback = function (err, data, res) {
  if (err) {
    res.status(503)
    res.send(err)
    return
  }
  res.send(data)
}

function getDefaultJoiNoteSchema () {
  return Joi.object().keys({
    description: Joi.string().required(),
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

module.exports = function (proxy) {
  class NotesController {
    constructor (proxy) {
      this.proxy = proxy
    }

    getNotesFromSession (req, res) {
      const sessionId = req.params.session_id
      const user = req.params.user
      const params = {}
      params['session_id'] = sessionId
      if (user) {
        params['user'] = user
      }
      proxy.getNotes(params, res, dataCallback)
    }

    addNewNoteToSession (req, res) {
      const schema = getDefaultJoiNoteSchema()
      const note = getDefaultNoteFromRequest(req)
      Joi.validate(note, schema, function (err, value) {
        if (err) {
          res.status(400)
          res.send(err)
          return
        }
        proxy.addNewNoteToSession(value, res, dataCallback)
      })
    }

    deleteNote (req, res) {
      const noteId = req.params.note_id
      proxy.deleteNote(noteId, (err, resp) => {
        if (err) {
          res.status(503)
          res.send(err)
          return
        }
        res.send(resp)
      })
    }
  }
  return new NotesController(proxy)
}
