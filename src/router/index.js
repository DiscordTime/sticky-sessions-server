const notesFromSessionURL = '/notes/'
const sessionURL = '/sessions/'
const teamURL = '/teams/'
const NotesRouter = require('./notesRouter')
const SessionRouter = require('./sessionRouter')
const TeamRouter = require('./teamRouter')

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
  }
}

module.exports = RouterProvider
