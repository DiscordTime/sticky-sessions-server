const express = require('express')
var app = express()

module.exports = function (sessionsController) {
  app.get('/:session_id', (req, res) => {
    sessionsController.getSession(req, res)
  })

  app.post('/', (req, res) => {
    sessionsController.createSession(req, res)
  })

  app.get('/', (req, res) => {
    sessionsController.getSessions(req, res)
  })

  app.post('/close/:session_id', (req, res) => {
    sessionsController.closeSession(req, res)
  })

  app.post('/:session_id', (req, res) => {
    sessionsController.editSession(req, res)
  })

  return app
}
