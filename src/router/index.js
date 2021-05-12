const notesFromSessionURL = '/notes/'
const sessionURL = '/sessions/'
const teamURL = '/teams/'
const meetURL = '/meets/'
const NotesRouter = require('./noteRouter/noteRouter')
const SessionRouter = require('./sessionRouter/sessionRouter')
const TeamRouter = require('./teamRouter/teamRouter')
const MeetRouter = require('./meetRouter/meetRouter')

class RouterProvider {
  constructor (app, controllers, auth) {
    this.app = app
    this.controllers = controllers
    this.auth = auth
  }

  init () {
    // Use middleware verifytoken function in before every route
    this.app.use(this.auth.verifyToken)

    var notesRouter = new NotesRouter(this.controllers.getNotesController())
    this.app.use(notesFromSessionURL, notesRouter.getRoutes())

    var sessionRouter = new SessionRouter(this.controllers.getSessionsController())
    this.app.use(sessionURL, sessionRouter.getRoutes())

    var teamRouter = new TeamRouter(this.controllers.getTeamsController())
    this.app.use(teamURL, teamRouter.getRoutes())

    var meetRouter = new MeetRouter(this.controllers.getMeetsController())
    this.app.use(meetURL, meetRouter.getRoutes())
  }
}

module.exports = RouterProvider
