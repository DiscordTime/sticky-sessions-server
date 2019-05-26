const NotesController = require('./notesController')

class ControllerProvider {
  constructor (proxy) {
    this.proxy = proxy
  }

  getNotesController () {
    return new NotesController(this.proxy)
  }

  getSessionsController () {
    return require('./sessionsController')(this.proxy)
  }
}

module.exports = ControllerProvider
