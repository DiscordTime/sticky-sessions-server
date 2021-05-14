const express = require('express')
const MeetingMapper = require('./meetingMapper')
const Router = require('../router')

class MeetingRouter {
  constructor (meetingController) {
    this.meetingMapper = new MeetingMapper()
    this.app = express()
    this.meetingController = meetingController
    this.genericRouter = new Router(this.meetingMapper)
  }

  getRoutes () {
    this.app.get('/', (req, res) => {
      this.genericRouter.execute(
        this.meetingController.getMeetings.bind(this.meetingController),
        this.meetingMapper.mapGetMeetings.bind(this.meetingMapper),
        req, res)
    })

    this.app.get('/:id', (req, res) => {
      this.genericRouter.execute(
        this.meetingController.getMeeting.bind(this.meetingController),
        this.meetingMapper.mapGetMeeting.bind(this.meetingMapper),
        req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.execute(
        this.meetingController.createMeeting.bind(this.meetingController),
        this.meetingMapper.mapCreateMeeting.bind(this.meetingMapper),
        req, res)
    })

    this.app.put('/:id', (req, res) => {
      this.genericRouter.execute(
        this.meetingController.editMeeting.bind(this.meetingController),
        this.meetingMapper.mapEditMeeting.bind(this.meetingMapper),
        req, res)
    })

    this.app.delete('/:id', (req, res) => {
      this.genericRouter.execute(
        this.meetingController.deleteMeeting.bind(this.meetingController),
        this.meetingMapper.mapDeleteMeeting.bind(this.meetingMapper),
        req, res)
    })

    return this.app
  }
}

module.exports = MeetingRouter
