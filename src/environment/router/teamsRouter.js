const express = require('express')
var app = express()

module.exports = function (teamsController) {
  app.post('/create', (req, res) => {
    teamsController.createTeam(req, res)
  })

  return app
}
