const NotesController = require('./notesController')

class ControllersProvider {
  constructor (notesRepository, sessionsRepository) {
    this.notesRepository = notesRepository
    this.sessionsRepository = sessionsRepository
  }

  provideNotesController () {
    return new NotesController(this.notesRepository)
  }

  getSessionsController () {
    return require('./sessionsController')(this.sessionsRepository)
  }
}

module.exports = ControllersProvider
