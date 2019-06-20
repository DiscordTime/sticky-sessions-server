const NotesController = require('./notesController')

class ControllersProvider {
  constructor (notesRepository, sessionRepository) {
    this.notesRepository = notesRepository
    this.sessionRepository = sessionRepository
  }

  provideNotesController () {
    return new NotesController(this.notesRepository)
  }

  getSessionsController () {
    return new SessionController(this.sessionRepository)
  }
}

module.exports = ControllersProvider
