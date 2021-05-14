const NoteController = require('./noteController')
const SessionController = require('./sessionController')
const TeamController = require('./teamController')
const MeetingController = require('./meetingController')

class ControllersProvider {
  constructor (noteRepository, sessionRepository, teamRepository, meetingRepository) {
    this.noteRepository = noteRepository
    this.sessionRepository = sessionRepository
    this.teamRepository = teamRepository
    this.meetingRepository = meetingRepository
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

  getMeetingsController () {
    return new MeetingController(this.meetingRepository)
  }
}

module.exports = ControllersProvider
