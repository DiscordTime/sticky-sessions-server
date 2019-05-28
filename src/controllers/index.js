const NotesController = require('./notesController')

class ControllersProvider {
  constructor (notesRepository) {
    this.notesRepository = notesRepository
  }

  provideNotesController () {
    return new NotesController(this.notesRepository)
  }

  getSessionsController () {
    return require('./sessionsController')(this.proxy)
  }
}

module.exports = ControllersProvider
