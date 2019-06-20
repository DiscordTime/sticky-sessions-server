class NoteRepository {
  constructor (db) {
    this.db = db
  }

  async getNotes (filter) {
    return this.db.executeGetDB('notes', filter)
  }

  async addNewNoteToSession (note) {
    return this.db.executeInsert('notes', note)
  }

  async deleteNote (noteId) {
    return this.db.executeDelete('notes', noteId)
  }

  async editNote (noteId, note) {
    return this.db.executeUpdateDB('notes', noteId, note)
  }
}

module.exports = NoteRepository
