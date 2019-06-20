const notesFromSessionURL = '/notes/'
const sessionURL = '/sessions/'
const NotesRouter = require('./notesRouter')

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

    var sessionsRouter = new SessionRouter(this.controllers.getSessionsController())
    this.app.use(sessionURL, sessionsRouter.getRoutes())
  }
}

module.exports = RouterProvider
