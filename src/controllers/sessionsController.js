const Joi = require('joi')

class SessionController {
  constructor (sessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async getAllSessions (session) {
    return this.sessionRepository.getAllSessions(session.getSession())
  }

  async getSession (session) {
    this.validateSessionId(session)
    return this.sessionRepository.getSession(session.getSession())
  }

  async addSession (session) {
    this.validateFullSession(session)
    return this.sessionRepository.addNewNoteToSession(session.getSession())
  }

  async deleteSession (session) {
    this.validateSessionId(session)
    return this.sessionRepository.deleteSession(session.id)
  }

  async editSession (session) {
    this.validateSession(session)
    return this.sessionRepository.editNote(session.id, session.getSession())
  }

  validateSessionId(session) {
    Joi.validate(session, Joi.object({
      id: Joi.string().required()
    }))
  }

  validateFullSession(session) {
    Joi.validate(session, Joi.object({
      id: Joi.string().required(),
      topics: Joi.array().items(Joi.string()).required(),
      timestamp: Joi.date().timestamp().required()
    }))
  }

  validateSession(session) {
    Joi.validate(session, Joi.object({
      topics: Joi.array().items(Joi.string()).required(),
      timestamp: Joi.date().timestamp().required()
    }))
  }

}
module.exports = SessionController
