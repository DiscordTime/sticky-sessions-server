const NotesRepository = require('./notesRepository')
const SessionsRepository = require('./sessionsRepository')

class RepositoriesProvider {
  constructor (db, db2) {
    this.db = db
    this.db2 = db2
  }

  provideNotesRepository () {
    return new NotesRepository(this.db)
  }

  provideSessionsRepository () {
    return new SessionsRepository(this.db2)
  }
}

module.exports = RepositoriesProvider
