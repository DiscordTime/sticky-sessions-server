const Joi = require('joi')

function mapToSession (data) {
  if (!data) return
  return {
    id: data.id,
    topics: data.topics,
    timestamp: data.timestamp
  }
}

var dataCallback = function (err, data, res) {
  if (err) {
    res.status(503)
    res.send(err)
    return
  }
  res.send(mapToSession(data))
}

function getFullSessionJoiSchema () {
  return getDefaultJoiSessionSchema().concat(Joi.object({
    id: Joi.string().required(),
    timestamp: Joi.date().timestamp().required()
  }))
}

function getDefaultJoiSessionSchema () {
  return Joi.object().keys({
    topics: Joi.array().items(Joi.string()).required()
  })
}

module.exports = function (proxy) {
  class SessionsController {
    getSession (req, res) {
      var sessionId = req.params.session_id
      proxy.getSession(sessionId, res, dataCallback)
    }

    createSession (req, res) {
      const topics = req.body
      Joi.validate(topics, Joi.array().items(Joi.string()), function (err, value) {
        if (err) {
          res.status(400)
          res.send(err)
          return
        }
        proxy.createSession(value, res, dataCallback)
      })
    }

    getSessions (req, res) {
      proxy.getSessions((err, sessions) => {
        if (err) {
          res.status(503)
          res.send(err)
          return
        }
        res.send(sessions)
      })
    }

    closeSession (req, res) {
      const sessionId = req.params.session_id
      proxy.closeSession(sessionId, (err) => {
        if (err) {
          res.status(503)
          res.send(err)
          return
        }
        res.send(sessionId)
      })
    }

    editSession (req, res) {
      const schema = getFullSessionJoiSchema()
      const session = req.body
      Joi.validate(session, schema, function (err, value) {
        if (err) {
          res.status(400)
          res.send(err)
          return
        }
        proxy.editSession(value, (err, returnedSession) => {
          dataCallback(err, returnedSession, res)
        })
      })
    }
  }
  return new SessionsController(proxy)
}
