const Joi = require('joi')

class Note {
  constructor (topic, description, user, sessionId) {
    this.topic = topic
    this.description = description
    this.user = user
    this.sessionId = sessionId
  }

  getNote() {
    return {
      topic: this.topic,
      description: this.description,
      user: this.user,
      session_id: this.sessionId
    }
  }

  isValid () {
    const {error} = Joi.validate(this, this.getDefaultJoiNoteSchema())
    this.error = error
    return !this.error
  }

  getValidationError () {
    return this.error.details[0].message
  }

  getDefaultJoiNoteSchema () {
    return Joi.object().keys({
      description: Joi.string().required().max(100),
      user: Joi.string().required(),
      sessionId: Joi.string().required(),
      topic: Joi.string().required()
    })
  }
}
module.exports = Note
