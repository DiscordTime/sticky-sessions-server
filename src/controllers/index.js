const NoteController = require('./noteController')
const SessionController = require('./sessionController')

class ControllersProvider {
  constructor (noteRepository, sessionRepository) {
    this.noteRepository = noteRepository
    this.sessionRepository = sessionRepository
  }

  provideNotesController () {
    return new NoteController(this.noteRepository)
  }

  getSessionsController () {
    return new SessionController(this.sessionRepository)
  }
}

module.exports = ControllersProvider
