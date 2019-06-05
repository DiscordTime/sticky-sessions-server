class SessionsRepository {
  constructor (db) {
    this.db = db
  }

  getSession (sessionId, res, callback) {
    this.db.getSession(sessionId, (err, snapshot) => {
      callback(err, snapshot, res)
    })
  }

  getSessions (callback) {
    this.db.getSessions(callback)
  }

  createSession (topics, res, callback) {
    this.db.createSession(topics, (err, data) => {
      callback(err, data, res)
    })
  }

  closeSession (sessionId, callback) {
    this.db.closeSession(sessionId, (err) => {
      callback(err)
    })
  }

  editSession (session, callback) {
    this.db.editSession(session, callback)
  }
}

module.exports = SessionsRepository
