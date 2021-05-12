const Joi = require('joi')
const GenericMapper = require('../genericMapper')
const Session = require('../../model/session')

class SessionMapper {
  constructor () {
    this.genericMapper = new GenericMapper()
  }

  mapGetSessions (req) {
    var map = this.genericMapper.map(this.validateMeetId.bind(this), req.query)
    var model = new Session(null, null, null, map.meetId)
    return model
  }

  mapGetSession (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Session(map.id, null, null, null)
    return model
  }

  mapCreateSession (req) {
    var map = this.genericMapper.map(this.validateSession.bind(this), req.body)
    var model = new Session(null, map.topics, map.timestamp, map.meetId)
    console.log("map: ", JSON.stringify(map))
    console.log("model: ", JSON.stringify(model))
    return model
  }

  mapEditSession (req) {
    let newSession = { ...req.params, ...req.body }
    var map = this.genericMapper.map(this.validateSessionWithId.bind(this), newSession)
    var model = new Session(map.id, map.topics, map.timestamp, map.meetId)
    return model
  }

  mapDeleteSession (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Session(map.id, null, null, null)
    return model
  }

  validateMeetId (session) {
    return Joi.validate(session, Joi.object({
      meetId: Joi.string().required()
    }).required())
  }

  validateId (session) {
    return Joi.validate(session, Joi.object({
      id: Joi.string().required()
    }).required())
  }

  validateSessionWithId (session) {
    var model = Joi.validate(session, Joi.object({
      id: Joi.string().required(),
      topics: Joi.array().required(),
      timestamp: Joi.string().required()
    }))

    return model
  }

  validateSession (session) {
    var model = Joi.validate(session, Joi.object({
      topics: Joi.array().required(),
      timestamp: Joi.string().required(),
      meetId: Joi.string().required()
    }))

    return model
  }
}

module.exports = SessionMapper
