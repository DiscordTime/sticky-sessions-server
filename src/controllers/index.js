module.exports.init = function (proxy) {
  exports.notesController = require('./notesController')(proxy)
  exports.sessionsRouter = require('./sessionsController')(proxy)
}
