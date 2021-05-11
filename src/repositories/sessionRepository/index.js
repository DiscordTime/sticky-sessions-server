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
    return this.db.executeInsert(this.table, session)
  }

  async deleteSession (id) {
    return this.db.executeDelete(this.table, id)
  }

  async editSession (id, session) {
    return this.db.executeUpdateDB(this.table, id, session)
  }
}

module.exports = SessionsRepository
