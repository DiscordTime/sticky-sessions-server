const notesFromSessionURL = '/notes/'
const sessionURL = '/sessions/'
const teamsURL = '/teams/'

module.exports.init = function (app, controllers) {
  const notesRouter = require('./notesRouter')(controllers.notesController)
  app.use(notesFromSessionURL, notesRouter)

  const sessionsRouter = require('./sessionsRouter')(controllers.sessionsRouter)
  app.use(sessionURL, sessionsRouter)

  const teamsRouter = require('./teamsRouter')(controllers.teamsRouter)
  app.use(teamsURL, teamsRouter)
}
