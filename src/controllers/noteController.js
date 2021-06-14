class NoteController {
  constructor (noteRepository) {
    this.noteRepository = noteRepository
  }

  async getNotesFromSession (note) {
    return this.noteRepository.getNotes(note)
  }

  async addNewNoteToSession (note) {
    return this.noteRepository.addNewNoteToSession(note)
  }

  async deleteNote (note) {
    return this.noteRepository.deleteNote(note.id)
  }

  async editNote (note) {
    return this.noteRepository.editNote(note.id, note)
  }
}

module.exports = NoteController
