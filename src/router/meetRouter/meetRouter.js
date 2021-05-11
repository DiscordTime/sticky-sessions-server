const express = require('express')
const MeetMapper = require('./meetMapper')
const Router = require('../router')

class MeetRouter {
  constructor (meetController) {
    this.meetMapper = new MeetMapper()
    this.app = express()
    this.meetController = meetController
    this.genericRouter = new Router(this.meetMapper)
  }

  getRoutes () {
    this.app.get('/', (req, res) =>
      this.genericRouter.execute(
        this.meetController.getMeets.bind(this.meetController),
        this.meetMapper.mapGetMeets.bind(this.meetMapper),
        req, res))

    this.app.get('/:id', (req, res) =>
      this.genericRouter.execute(
        this.meetController.getMeet.bind(this.meetController),
        this.meetMapper.mapGetMeet.bind(this.meetMapper),
        req, res))

    this.app.post('/', (req, res) =>
      this.genericRouter.execute(
        this.meetController.createMeet.bind(this.meetController),
        this.meetMapper.mapCreateMeet.bind(this.meetMapper),
        req, res))

    this.app.put('/:id', (req, res) =>
      this.genericRouter.execute(
        this.meetController.editMeet.bind(this.meetController),
        this.meetMapper.mapEditMeet.bind(this.meetMapper),
        req, res))

    this.app.delete('/:id', (req, res) =>
      this.genericRouter.execute(
        this.meetController.deleteMeet.bind(this.meetController),
        this.meetMapper.mapDeleteMeet.bind(this.meetMapper),
        req, res))

    return this.app
  }
}

module.exports = MeetRouter
