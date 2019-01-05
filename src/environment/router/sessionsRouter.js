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

  app.get('/paging/:limit/:milliseconds?', (req, res) => {
    sessionsController.getSessionsPaging(req, res)
  })

  return app
}
