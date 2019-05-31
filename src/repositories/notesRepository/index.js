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

  async addNewNoteToSession (note) {
    return await this.db.executeInsert('notes', note)
  }
}

module.exports = NotesRepository
