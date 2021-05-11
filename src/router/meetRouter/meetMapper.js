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
    const map = this.genericMapper.map(this.validateId.bind(this), req.params)
    return new Meet(map.id, null, null, null)
  }

  mapCreateMeet (req) {
    const map = this.genericMapper.map(this.validateMeet.bind(this), req.body)
    return new Meet(null, map.date, map.idTeam, map.members)
  }

  mapEditMeet (req) {
    const newMeet = { ...req.params, ...req.body }
    const map = this.genericMapper.map(this.validateMeetWithId.bind(this), newMeet)
    return new Meet(null, map.date, map.idTeam, map.members)
  }

  mapDeleteMeet (req) {
    const map = this.genericMapper.map(this.validateId.bind(this), req.params)
    return new Meet(map.id, null, null, null)
  }

  validateEmpty (meet) {
    return Joi.object().required().validate(meet)
  }

  validateId (meet) {
    return Joi.object({
      id: Joi.string().required()
    }).required().validate(meet)
  }

  validateMeetWithId (meet) {
    return Joi.object({
      id: Joi.string().required(),
      date: Joi.string().required(),
      idTeam: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }).validate(meet)
  }

  validateMeet (meet) {
    return Joi.object({
      date: Joi.string().required(),
      idTeam: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }).validate(meet)
  }
}

module.exports = MeetMapper
