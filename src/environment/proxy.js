class Proxy {
  init (db) {
    this.db = db
  }

  getNotes (params, res, callback) {
    this.db.getNotes(params, (err, snapshot) => {
      callback(err, snapshot, res)
    })
  }

  addNewNoteToSession (note, res, callback) {
    this.db.addNewNoteToSession(note, (err, data) => {
      callback(err, data, res)
    })
  }

  deleteNote (noteId, callback) {
    this.db.deleteNote(noteId, (err, resp) => {
      callback(err, resp)
    })
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
}

module.exports = new Proxy()
