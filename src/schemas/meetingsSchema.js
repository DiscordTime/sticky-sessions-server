const Joi = require('joi')
const sessionSchemas = require('./sessionsSchema')

class MeetingsSchema {
  getInsertMeetingSchema () {
    return Joi.object().keys({
      id: Joi.string(),
      teamId: Joi.string().required(),
      name: Joi.string().required(),
      date: Joi.date().timestamp().required(),
      to: Joi.date().timestamp().required(),
      location: Joi.string(),
      sessions: Joi.array().items(sessionSchemas)
    })
  }

  getGetMeetingSchema () {
    return Joi.object().keys({
      id: Joi.string(),
      teamId: Joi.string()
    })
  }

  getUpdateMeetingSchema () {
    return Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string(),
      date: Joi.date().timestamp(),
      to: Joi.date().timestamp(),
      location: Joi.string()
    })
  }

  getDeleteMeetingSchema () {
    return Joi.object().keys({
      id: Joi.string().required()
    })
  }
}

module.exports = MeetingsSchema
