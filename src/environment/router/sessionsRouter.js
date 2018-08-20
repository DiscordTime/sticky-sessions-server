const express = require('express')
var app = express()

module.exports = function (sessionsController) {
  app.get('/:session_id', (req, res) => {
    sessionsController.getSession(req, res)
  })

  app.post('/', (req, res) => {
    sessionsController.createSession(req, res)
  })

  return app
}
