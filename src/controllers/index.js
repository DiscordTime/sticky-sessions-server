const NoteController = require('./noteController')
const SessionController = require('./sessionController')
const TeamController = require('./teamController')
const MeetController = require('./meetController')

class ControllersProvider {
  constructor (noteRepository, sessionRepository, teamRepository, meetRepository) {
    this.noteRepository = noteRepository
    this.sessionRepository = sessionRepository
    this.teamRepository = teamRepository
    this.meetRepository = meetRepository
  }

  getNotesController () {
    return new NoteController(this.noteRepository)
  }

  getSessionsController () {
    return new SessionController(this.sessionRepository)
  }

  getTeamsController () {
    return new TeamController(this.teamRepository)
  }

  getMeetsController () {
    return new MeetController(this.meetRepository)
  }
}

module.exports = ControllersProvider
