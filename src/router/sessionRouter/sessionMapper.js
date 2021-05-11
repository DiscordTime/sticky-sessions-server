const Joi = require('joi')
const GenericMapper = require('../genericMapper')
const Session = require('../../model/session')

class SessionMapper {
  constructor () {
    this.genericMapper = new GenericMapper()
  }

  mapGetSessions (req) {
    const map = this.genericMapper.map(this.validateMeetId.bind(this), req.query)
    return new Session(null, null, null, map.meetId)
  }

  mapGetSession (req) {
    const map = this.genericMapper.map(this.validateId.bind(this), req.params)
    return new Session(map.id, null, null, null)
  }

  mapCreateSession (req) {
    const map = this.genericMapper.map(this.validateSession.bind(this), req.body)
    return new Session(null, map.topics, map.timestamp, map.meetId)
  }

  mapEditSession (req) {
    const newSession = { ...req.params, ...req.body }
    const map = this.genericMapper.map(this.validateSessionWithId.bind(this), newSession)
    return new Session(map.id, map.topics, map.timestamp, map.meetId)
  }

  mapDeleteSession (req) {
    const map = this.genericMapper.map(this.validateId.bind(this), req.params)
    return new Session(map.id, null, null, null)
  }

  validateMeetId (session) {
    return Joi.object({
      meetId: Joi.string().required()
    }).required().validate(session)
  }

  validateId (session) {
    return Joi.object({
      id: Joi.string().required()
    }).required().validate(session)
  }

  validateSessionWithId (session) {
    return Joi.object({
      id: Joi.string().required(),
      topics: Joi.array().required(),
      timestamp: Joi.string().required()
    }).validate(session)
  }

  validateSession (session) {
    return Joi.object({
      topics: Joi.array().required(),
      timestamp: Joi.string().required(),
      meetId: Joi.string().required()
    }).validate(session)
  }
}

module.exports = SessionMapper
