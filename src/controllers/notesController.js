const Joi = require('joi')

var snapshotCallback = function (err, snapshot, res) {
  if (err) {
    console.err(err)
    res.send('ERROR!')
    return
  }

  var array = []
  snapshot.forEach(doc => {
    var data = doc.data()
    array.push(data)
  })
  res.send(array)
}

var dataCallback = function (err, data, res) {
  if (err) {
    console.err(err)
    res.send('ERROR!')
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
    sessionId: req.body.session_id,
    topic: req.body.topic
  }
}

module.exports = function (proxy) {
  class NotesController {
    constructor (proxy) {
      this.proxy = proxy
    }

    getNotesFromSession (req, res) {
      var sessionId = req.params.session_id
      proxy.getNotes(sessionId, res, snapshotCallback)
    }

    addNewNoteToSession (req, res) {
      const schema = getDefaultJoiNoteSchema()
      const note = getDefaultNoteFromRequest(req)

      Joi.validate(note, schema, function (err, value) {
        if (err) {
          res.send(err)
          return
        }
        proxy.addNewNoteToSession(value, res, dataCallback)
      })
    }
  }
  return new NotesController(proxy)
}
