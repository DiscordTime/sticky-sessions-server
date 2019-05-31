class NotesRepository {
  constructor (db) {
    this.db = db
  }

  async getNotes (note) {
    return this.db.executeGetDB('notes', note.getNote())
  }

  async addNewNoteToSession (note) {
    return this.db.executeInsert('notes', note.getNote())
  }

  async deleteNote (note) {
    return this.db.executeDelete('notes', note.id)
  }

  async editNote (note) {
    return this.db.executeUpdateDB('notes', note.id, note.getNote())
  }
}

module.exports = NotesRepository
