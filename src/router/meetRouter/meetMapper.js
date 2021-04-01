const Joi = require('joi')
const GenericMapper = require('../genericMapper')
const Meet = require('../../model/meet')

class MeetMapper {
  constructor () {
    this.genericMapper = new GenericMapper()
  }

  mapGetMeets (req) {
    return this.genericMapper.map(this.validateEmpty.bind(this), req.params)
  }

  mapGetMeet (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Meet(map.id, null, null, null)
    return model
  }

  mapCreateMeet (req) {
    var map = this.genericMapper.map(this.validateMeet.bind(this), req.body)
    var model = new Meet(null, map.date, map.idTeam, map.members)
    return model
  }

  mapEditMeet (req) {
    let newMeet = { ...req.params, ...req.body }
    var map = this.genericMapper.map(this.validateMeetWithId.bind(this), newMeet)
    var model = new Meet(null, map.date, map.idTeam, map.members)
    return model
  }

  mapDeleteMeet (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Meet(map.id, null, null, null)
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

  validateMeetWithId (meet) {
    var model = Joi.validate(meet, Joi.object({
      id: Joi.string().required(),
      date: Joi.string().required(),
      idTeam: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }))

    return model
  }

  validateMeet (meet) {
    var model = Joi.validate(meet, Joi.object({
      date: Joi.string().required(),
      idTeam: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }))

    return model
  }
}

module.exports = MeetMapper
