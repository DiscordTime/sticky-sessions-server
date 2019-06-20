const notesFromSessionURL = '/notes/'
const sessionURL = '/sessions/'
const boardURL = '/boards/'
const NoteRouter = require('./noteRouter')
const SessionRouter = require('./sessionRouter')
const BoardRouter = require('./boardRouter')

class RouterProvider {
  constructor (app, controllers, auth) {
    this.app = app
    this.controllers = controllers
    this.auth = auth
  }

  init () {
    // Use middleware verifytoken function in before every route
    this.app.use(this.auth.verifyToken)

    var noteRouter = new NoteRouter(this.controllers.provideNoteController())
    this.app.use(notesFromSessionURL, noteRouter.getRoutes())

    var sessionsRouter = new SessionRouter(this.controllers.provideSessionController())
    this.app.use(sessionURL, sessionsRouter.getRoutes())

    var boardRouter = new BoardRouter(this.controllers.provideBoardController())
    this.app.use(boardURL, boardRouter.getRoutes())
  }
}

module.exports = RouterProvider
