const NoteController = require('./noteController')
const SessionController = require('./sessionController')
const TeamController = require('./teamController')

class ControllersProvider {
  constructor (noteRepository, sessionRepository, teamRepository) {
    this.noteRepository = noteRepository
    this.sessionRepository = sessionRepository
    this.teamRepository = teamRepository
  }

  provideNotesController () {
    return new NoteController(this.noteRepository)
  }

  getSessionsController () {
    return new SessionController(this.sessionRepository)
  }

  getTeamsController () {
    return new TeamController(this.teamRespository)
  }
}

module.exports = ControllersProvider
