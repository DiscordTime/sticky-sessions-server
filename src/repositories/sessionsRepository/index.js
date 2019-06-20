class SessionsRepository {
  constructor (db) {
    this.db = db
  }

  getSession (session) {
    return this.db.executeGetDB(session.table, session)
  }

  getAllSessions (session) {
    return this.db.executeGetDB(session.table)
  }

  createSession (session) {
    return this.db.executeInsert(session.table, session)
  }

  deleteSession (session) {
    return this.db.executeDeleteDB(session.table, session)
  }

  editSession (session) {
    return this.db.executeUpdateDB(session.table, session)
  }
}

module.exports = SessionsRepository
