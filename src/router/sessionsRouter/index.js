const express = require('express')
const SessionMapper = require('./mapper')
const Router = require('../router')

class SessionRouter {
  constructor (sessionController) {
    this.sessionMapper = new SessionMapper()
    this.app = express()
    this.sessionController = sessionController
    this.genericRouter = new Router(this.sessionMapper)
  }

  registerRoutes () {
    this.app.get('/', (req, res) => {
      this.genericRouter.execute(this.sessionController.getAllSessions, req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.execute(this.sessionController.createSession, req, res)
    })

    this.app.put('/', (req, res) => {
      this.genericRouter.execute(this.sessionController.editSessions, req, res)
    })

    this.app.delete('/', (req, res) => {
      this.genericRouter.execute(this.sessionController.deleteSession, req, res)
    })
  }

}

module.exports = SessionRouter
