const NoteRepository = require('./noteRepository/noteRepository')
const SessionRepository = require('./sessionRepository/sessionRepository')
const TeamRepository = require('./teamRepository/teamRepository')
const MeetingRepository = require('./meetingRepository/meetingRepository')

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

  provideMeetingsRepository () {
    return new MeetingRepository(this.db)
  }
}

module.exports = RepositoriesProvider
