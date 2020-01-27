const express = require('express')
const Router = require('../router')
const MeetingsMapper = require('./mapper')

class MeetingsRouter {
  constructor (meetingsController) {
    this.meetingsController = meetingsController
    this.app = express()
    this.genericRouter = new Router(new MeetingsMapper())
  }
  getRoutes () {
    this.app.post('/', async (req, res) => {
      await this.genericRouter.execute(this.meetingsController.insertMeeting
        .bind(this.meetingsController), req, res)
    })

    this.app.get('/', async (req, res) => {
      await this.genericRouter.execute(this.meetingsController.getMeeting
        .bind(this.meetingsController), req, res)
    })

    this.app.post('/edit/:meeting_id', async (req, res) => {
      await this.genericRouter.execute(this.meetingsController.updateMeeting
        .bind(this.meetingsController), req, res)
    })

    this.app.delete('/:meeting_id', async (req, res) => {
      await this.genericRouter.execute(this.meetingsController.deleteMeeting
        .bind(this.meetingsController), req, res)
    })

    return this.app
  }
}

module.exports = MeetingsRouter
