const notesFromSessionURL = '/notes/'
const sessionURL = '/sessions/'
const meetingURL = '/meetings/'

const NotesRouter = require('./notesRouter')
const SessionRouter = require('./sessionRouter')
const MeetingRouter = require('./meetingsRouter')

class RouterProvider {
  constructor (app, controllers, auth) {
    this.app = app
    this.controllers = controllers
    this.auth = auth
  }

  init () {
    // Use middleware verifytoken function in before every route
    this.app.use(this.auth.verifyToken)

    var notesRouter = new NotesRouter(this.controllers.provideNotesController())
    this.app.use(notesFromSessionURL, notesRouter.getRoutes())

    var sessionRouter = new SessionRouter(this.controllers.getSessionsController())
    this.app.use(sessionURL, sessionRouter.getRoutes())

    var meetingRouter = new MeetingRouter(this.controllers.provideMeetingsController())
    this.app.use(meetingURL, meetingRouter.getRoutes())
  }
}

module.exports = RouterProvider
