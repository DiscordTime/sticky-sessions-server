const express = require('express')
const SessionMapper = require('./sessionMapper')
const Router = require('../router')

class SessionRouter {
  constructor (sessionController) {
    this.sessionMapper = new SessionMapper()
    this.app = express()
    this.sessionController = sessionController
    this.genericRouter = new Router(this.sessionMapper)
  }

  getRoutes () {
    this.app.get('/:id', (req, res) => {
      this.genericRouter.execute(
        this.sessionController.getSession.bind(this.sessionController),
        this.sessionMapper.mapGetSession.bind(this.sessionMapper),
        req, res)
    })

    this.app.get('/', (req, res) => {
      this.genericRouter.execute(
        this.sessionController.getAllSessions.bind(this.sessionController),
        this.sessionMapper.mapGetSessions.bind(this.sessionMapper),
        req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.execute(
        this.sessionController.createSession.bind(this.sessionController),
        this.sessionMapper.mapCreateSession.bind(this.sessionMapper),
        req, res)
    })

    this.app.put('/:id', (req, res) => {
      this.genericRouter.execute(
        this.sessionController.editSession.bind(this.sessionController),
        this.sessionMapper.mapEditSession.bind(this.sessionMapper),
        req, res)
    })

    this.app.delete('/:id', (req, res) => {
      this.genericRouter.execute(
        this.sessionController.deleteSession.bind(this.sessionController),
        this.sessionMapper.mapDeleteSession.bind(this.sessionMapper),
        req, res)
    })

    return this.app
  }
}

module.exports = SessionRouter
