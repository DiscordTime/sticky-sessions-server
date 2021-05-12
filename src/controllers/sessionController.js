const Joi = require('joi')

class SessionController {
  constructor (sessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async getAllSessions (meetingId) {
    return this.sessionRepository.getAllSessions(meetingId)
  }

  async getSession (session) {
    return this.sessionRepository.getSession(session)
  }

  async createSession (session) {
    return this.sessionRepository.createSession(session)
  }

  async deleteSession (session) {
    return this.sessionRepository.deleteSession(session.id)
  }

  async editSession (session) {
    return this.sessionRepository.editSession(session.id, session)
  }
}
module.exports = SessionController
