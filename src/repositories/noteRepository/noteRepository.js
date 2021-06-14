class NotesRepository {
  constructor (db) {
    this.db = db
  }

  async getNotes (note) {
    return this.db.executeGetDB('notes', note)
  }

  async addNewNoteToSession (note) {
    return this.db.executeInsert('notes', note.getNote())
  }

  async deleteNote (noteId) {
    return this.db.executeDelete('notes', noteId)
  }

  async editNote (noteId, note) {
    return this.db.executeUpdateDB('notes', noteId, note.getNote())
  }
}

module.exports = NotesRepository
