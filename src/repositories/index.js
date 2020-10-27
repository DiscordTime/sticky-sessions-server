const NoteRepository = require('./noteRepository')
const SessionRepository = require('./sessionRepository')
const TeamRepository = require('./teamRepository/teamRepository')

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

  provideTeamsRepository () {
    return new TeamRepository(this.db)
  }
}

module.exports = RepositoriesProvider
