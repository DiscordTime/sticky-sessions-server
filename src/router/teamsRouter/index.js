const express = require('express')
//const SessionMapper = require('./mapper')
const Router = require('../router')

class TeamRouter {
  constructor (teamController) {
    this.app = express()
    this.teamController = teamController
    this.genericRouter = new Router(this.sessionMapper)
  }

  getRoutes () {
    this.app.get('/', (req, res) => {
      this.genericRouter.execute(this.sessionController.getAllSessions
        .bind(this.sessionController), req, res)
    })

    this.app.get('/:id', (req, res) => {
      this.genericRouter.execute(this.sessionController.getSession
        .bind(this.sessionController), req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.execute(this.sessionController.createSession
        .bind(this.sessionController), req, res)
    })

    this.app.put('/:id', (req, res) => {
      this.genericRouter.execute(this.sessionController.editSession
        .bind(this.sessionController), req, res)
    })

    this.app.delete('/:id', (req, res) => {
      this.genericRouter.execute(this.sessionController.deleteSession
        .bind(this.sessionController), req, res)
    })

    return this.app
  }
}

module.exports = SessionRouter
