const NoteController = require('./noteController')
const SessionController = require('./sessionController')
const BoardController = require('./boardController')

class ControllersProvider {
  constructor (noteRepository, sessionRepository, boardRepository) {
    this.noteRepository = noteRepository
    this.sessionRepository = sessionRepository
    this.boardRepository = boardRepository
  }

  provideNoteController () {
    return new NoteController(this.noteRepository)
  }

  provideSessionController () {
    return new SessionController(this.sessionRepository)
  }

  provideBoardController () {
    return new BoardController(this.boardRepository)
  }
}

module.exports = ControllersProvider
