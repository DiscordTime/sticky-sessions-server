const Joi = require('joi')
const GenericMapper = require('../genericMapper')
const Meeting = require('../../model/meeting')

class MeetingMapper {
  constructor () {
    this.genericMapper = new GenericMapper()
  }

  mapGetMeetings (req) {
    if (req.query.teamId) {
      let map = this.genericMapper.map(this.validateTeamIdFromQuery.bind(this), req.query)
      return new Meeting(null, null, map.teamId, null)
    }
    return this.genericMapper.map(this.validateEmpty.bind(this), req.params)
  }

  mapGetMeeting (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Meeting(map.id, null, null, null)
    return model
  }

  mapCreateMeeting (req) {
    var map = this.genericMapper.map(this.validateMeeting.bind(this), req.body)
    var model = new Meeting(null, map.date, map.teamId, map.members)
    return model
  }

  mapEditMeeting (req) {
    let newMeeting = { ...req.params, ...req.body }
    var map = this.genericMapper.map(this.validateMeetingWithId.bind(this), newMeeting)
    var model = new Meeting(map.id, map.date, map.teamId, map.members)
    return model
  }

  mapDeleteMeeting (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Meeting(map.id, null, null, null)
    return model
  }

  validateEmpty (meet) {
    return Joi.validate(meet, Joi.object().required())
  }

  validateId (meet) {
    return Joi.validate(meet, Joi.object({
      id: Joi.string().required()
    }).required())
  }

  validateTeamIdFromQuery (query) {
    return Joi.validate(query, Joi.object({
      teamId: Joi.string().required()
    }).required())
  }

  validateMeetingWithId (meet) {
    var model = Joi.validate(meet, Joi.object({
      id: Joi.string().required(),
      date: Joi.string().required(),
      teamId: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }))
    return model
  }

  validateMeeting (meet) {
    var model = Joi.validate(meet, Joi.object({
      date: Joi.string().required(),
      teamId: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }))
    return model
  }
}

module.exports = MeetingMapper
