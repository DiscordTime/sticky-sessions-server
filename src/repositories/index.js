const NoteRepository = require('./noteRepository')
const SessionsRepository = require('./sessionRepository')
const MeetingsRepository = require('./meetingsRepository')

class RepositoriesProvider {
  constructor (db) {
    this.db = db
  }

  provideNotesRepository () {
    return new NoteRepository(this.db)
  }

  provideSessionsRepository () {
    return new SessionsRepository(this.db)
  }

  provideMeetingsRepository () {
    return new MeetingsRepository(this.db)
  }
}

module.exports = RepositoriesProvider
