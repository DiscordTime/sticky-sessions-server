const Joi = require('joi')

function mapToSession (data) {
  return {
    session_id: data.id,
    topics: data.topics,
    timestamp: data.timestamp
  }
}

var dataCallback = function (err, data, res) {
  if (err) {
    console.err(err)
    res.send(err)
    return
  }
  res.send(mapToSession(data))
}

module.exports = function (proxy) {
  class SessionsController {
    constructor (proxy) {
      this.proxy = proxy
    }

    getSession (req, res) {
      var sessionId = req.params.session_id
      proxy.getSession(sessionId, res, dataCallback)
    }

    createSession (req, res) {
      var topics = req.body.topics
      Joi.validate(topics, Joi.array().items(Joi.string()), function (err, value) {
        if (err) {
          res.send(err)
          return
        }
        proxy.createSession(value, res, dataCallback)
      })
    }
  }
  return new SessionsController(proxy)
}
