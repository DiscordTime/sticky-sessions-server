const NoteRepository = require('./noteRepository')
const SessionRepository = require('./sessionRepository')
const BoardsRepository = require('./boardRepository')

class RepositoriesProvider {
  constructor (db) {
    this.db = db
  }

  provideNoteRepository () {
    return new NoteRepository(this.db)
  }

  provideSessionRepository () {
    return new SessionRepository(this.db)
  }

  provideBoardRepository () {
    return new BoardsRepository(this.db)
  }
}

module.exports = RepositoriesProvider
