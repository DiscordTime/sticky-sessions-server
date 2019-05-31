class NotesController {
  constructor (notesRepository) {
    this.notesRepository = notesRepository
  }

  async getNotesFromSession (note) {
    return this.notesRepository.getNotes(note)
  }

  async addNewNoteToSession (note) {
    return this.notesRepository.addNewNoteToSession(note)
  }

  async deleteNote (note) {
    return this.notesRepository.deleteNote(note)
  }

  async editNote (note) {
    return this.notesRepository.editNote(note)
  }
}

module.exports = NotesController
