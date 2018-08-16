const notesFromSessionURL = '/notes/'
// Commented because lint gives an error when the variable
// is not yet being used.
// const sessionURL = '/sessions/'

module.exports.init = function (app, controllers) {
  const notesRouter = require('./notesRouter')(controllers.notesController)
  app.use(notesFromSessionURL, notesRouter)
}
