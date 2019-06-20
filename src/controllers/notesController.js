class NotesController {
  constructor (notesRepository) {
    this.notesRepository = notesRepository
  }

  async getNotesFromSession (note) {
    return this.notesRepository.getNotes(note.getNote())
  }

  async addNewNoteToSession (note) {
    return this.notesRepository.addNewNoteToSession(note.getNote())
  }

  async deleteNote (note) {
    return this.notesRepository.deleteNote(note.id)
  }

  async editNote (note) {
    return this.notesRepository.editNote(note.id, note.getNote())
  }
}

module.exports = NotesController
