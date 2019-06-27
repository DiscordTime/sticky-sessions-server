const Note = require('../../model/note')
const Joi = require('joi')

class NoteMapper {
  mapAddNoteToDomain (req) {
    const { error } = Joi.validate(req.body, this.bodyFullJoiSchema())
    if (error) {
      throw error.details[0].message
    }
    return new Note(
      null,
      req.body.topic,
      req.body.description,
      req.name,
      req.body.session_id
    )
  }

  bodyFullJoiSchema () {
    return Joi.object().keys({
      description: Joi.string().required().max(100),
      session_id: Joi.string().required(),
      topic: Joi.string().required()
    })
  }

  mapGetNotesQueryToDomain (req) {
    const { error } = Joi.validate(req.query, this.getNotesJoiSchema())
    if (error) {
      throw error.details[0].message
    }
    if (req.query.type === 'all') {
      return new Note(null, null, null, null, req.query.session_id)
    }
    return new Note(null, null, null, req.name, req.query.session_id)
  }

  getNotesJoiSchema () {
    return Joi.object().keys({
      session_id: Joi.string().required(),
      type: Joi.string().allow()
    })
  }

  deleteNoteToDomain (req) {
    const { error } = Joi.validate(req.params, this.idNoteJoiSchema())
    if (error) {
      throw error.details[0].message
    }
    return new Note(req.params.id, null, null, null, null)
  }

  idNoteJoiSchema () {
    return Joi.object().keys({
      id: Joi.string().required()
    })
  }

  editNoteToDomain (req) {
    const { error } = Joi.validate(req.params, this.idNoteJoiSchema())
    if (error) {
      throw error.details[0].message
    }

    const { errorBody } = Joi.validate(req.body, this.bodyFullJoiSchema())
    if (errorBody) {
      throw errorBody.details[0].message
    }

    return new Note(
      req.params.id,
      req.body.topic,
      req.body.description,
      req.name,
      req.body.session_id
    )
  }
}

module.exports = NoteMapper
