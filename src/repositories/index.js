const NotesRepository = require('./notesRepository')
const SessionsRepository = require('./sessionsRepository')

class RepositoriesProvider {
  constructor (db) {
    this.db = db
  }

  provideNotesRepository () {
    return new NotesRepository(this.db)
  }

  provideSessionsRepository () {
    return new SessionsRepository(this.db)
  }
}

module.exports = RepositoriesProvider
