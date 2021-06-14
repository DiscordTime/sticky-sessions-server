class SessionsRepository {
  constructor (db) {
    this.db = db
    this.table = 'sessions'
  }

  async getAllSessions (meetingId) {
    return this.db.executeGetDB(this.table, meetingId)
  }

  async getSession (session) {
    return this.db.executeGetDB(this.table, session)
  }

  async createSession (session) {
    return this.db.executeInsert(this.table, session.getSession())
  }

  async deleteSession (id) {
    return this.db.executeDelete(this.table, id)
  }

  async editSession (id, session) {
    delete session.id
    return this.db.executeUpdateDB(this.table, id, session.getSession())
  }
}

module.exports = SessionsRepository
