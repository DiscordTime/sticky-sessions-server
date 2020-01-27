const NoteController = require('./noteController')
const SessionController = require('./sessionController')
const MeetingsController = require('./meetingsController')

class ControllersProvider {
  constructor (noteRepository, sessionRepository, meetingsService) {
    this.noteRepository = noteRepository
    this.sessionRepository = sessionRepository
    this.meetingsService = meetingsService
  }

  provideNotesController () {
    return new NoteController(this.noteRepository)
  }

  getSessionsController () {
    return new SessionController(this.sessionRepository)
  }

  provideMeetingsController () {
    return new MeetingsController(this.meetingsService)
  }
}

module.exports = ControllersProvider
