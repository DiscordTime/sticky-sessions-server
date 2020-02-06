const express = require('express')
const TeamMapper = require('./mapper')
const Router = require('../router')

class TeamRouter {
  constructor (teamController) {
    this.teamMapper = new TeamMapper()
    this.app = express()
    this.teamController = teamController
    this.genericRouter = new Router(this.teamMapper)
  }

  getRoutes () {
    this.app.get('/', (req, res) => {
      this.genericRouter.execute(this.teamController.getTeams
        .bind(this.teamController), req, res)
    })

    this.app.get('/:id', (req, res) => {
      this.genericRouter.execute(this.teamController.getTeam
        .bind(this.teamController), req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.execute(this.teamController.createTeam
        .bind(this.teamController), req, res)
    })

    this.app.put('/:id', (req, res) => {
      this.genericRouter.execute(this.teamController.editTeam
        .bind(this.teamController), req, res)
    })

    this.app.delete('/:id', (req, res) => {
      this.genericRouter.execute(this.teamController.deleteTeam
        .bind(this.teamController), req, res)
    })

    return this.app
  }
}

module.exports = TeamRouter
