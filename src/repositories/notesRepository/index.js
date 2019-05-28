class NotesRepository {
  constructor (db) {
    this.db = db
  }

  async getNotes (sessionId, user) {
    var params = {
      'session_id': sessionId,
      'user': user
    }

    return this.db.executeGet('notes', params)
  }
}

module.exports = NotesRepository
