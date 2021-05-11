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
    // this.app.get('/:meetId', (req, res) => {
    //   this.genericRouter.executeOld(this.sessionController.getSession
    //     .bind(this.sessionController), req, res)
    // })

    this.app.get('/:meetId', (req, res) => {
      this.genericRouter.execute(
        this.sessionController.getAllSessions.bind(this.sessionController),
        this.sessionMapper.mapGetSessions.bind(this.sessionMapper),
        req, res)
    })

    this.app.get('/:id', (req, res) => {
      this.genericRouter.executeOld(this.sessionController.getSession
        .bind(this.sessionController), req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.executeOld(this.sessionController.createSession
        .bind(this.sessionController), req, res)
    })

    this.app.put('/:id', (req, res) => {
      this.genericRouter.executeOld(this.sessionController.editSession
        .bind(this.sessionController), req, res)
    })

    this.app.delete('/:id', (req, res) => {
      this.genericRouter.executeOld(this.sessionController.deleteSession
        .bind(this.sessionController), req, res)
    })

    return this.app
  }
}

module.exports = SessionRouter
