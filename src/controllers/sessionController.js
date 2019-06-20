const Joi = require('joi')

class SessionController {
  constructor (sessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async getAllSessions (meeting) {
    return this.sessionRepository.getAllSessions(meeting)
  }

  async getSession (session) {
    this.validateSessionId(session)
    return this.sessionRepository.getSession(session.getIdObject())
  }

  async createSession (session) {
    this.validateSession(session)
    return this.sessionRepository.createSession(session.getSession())
  }

  async deleteSession (session) {
    this.validateSessionId(session)
    return this.sessionRepository.deleteSession(session.id)
  }

  async editSession (session) {
    this.validateFullSession(session)
    return this.sessionRepository.editSession(session.id, session.getSession())
  }

  validateSessionId (session) {
    Joi.validate(session, Joi.object({
      id: Joi.string().required()
    }))
  }

  validateFullSession (session) {
    Joi.validate(session, Joi.object({
      id: Joi.string().required(),
      topics: Joi.array().items(Joi.string()).required(),
      timestamp: Joi.date().timestamp().required()
    }))
  }

  validateSession (session) {
    Joi.validate(session, Joi.object({
      topics: Joi.array().items(Joi.string()).required()
    }))
  }
}
module.exports = SessionController
