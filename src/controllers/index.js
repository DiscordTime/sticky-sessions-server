module.exports.init = function (proxy) {
  exports.notesController = require('./notesController')(proxy)
}
