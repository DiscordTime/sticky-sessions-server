class SessionRepository {
  constructor (db) {
    this.db = db
    this.table = 'sessions'
  }

  async getSession (session) {
    return this.db.executeGetDB(this.table, session)
  }

  // todo : getAllSession of a meeting
  // eslint-disable-next-line no-use-before-define
  async getAllSessions (meeting) {
    return this.db.executeGetDB(this.table)
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

module.exports = SessionRepository
