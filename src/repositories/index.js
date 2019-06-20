const NoteRepository = require('./noteRepository')
const SessionRepository = require('./sessionRepository')

class RepositoriesProvider {
  constructor (db) {
    this.db = db
  }

  provideNotesRepository () {
    return new NoteRepository(this.db)
  }

  provideSessionsRepository () {
    return new SessionRepository(this.db)
  }
}

module.exports = RepositoriesProvider
