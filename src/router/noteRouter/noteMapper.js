const Note = require('../../model/note')
const Joi = require('joi')
const GenericMapper = require('../genericMapper')

class NotesMapper {
  constructor () {
    this.genericMapper = new GenericMapper()
  }

  mapGetNotesFromSession (req) {
    var map = this.genericMapper.map(this.validateSessionId.bind(this), req.query)
    if (req.query.type === 'all') {
      // Get all notes
      return new Note(null, null, null, null, map.sessionId)
    }
    return new Note(null, null, null, req.name, map.sessionId)
  }

  mapAddNoteToDomain (req) {
    var map = this.genericMapper.map(this.validateBodyFullJoiSchema.bind(this), req.body)
    return new Note(null, map.topic, map.description, req.name, map.sessionId)
  }

  mapGetNotesQueryToDomain (req) {
    let map = this.genericMapper.map(this.validateNotesJoiSchema.bind(this), req.query)
    if (req.query.type === 'all') {
      return new Note(null, null, null, null, map.sessionId)
    }
    return new Note(null, null, null, req.name, map.sessionId)
  }

  mapEditNoteToDomain (req) {
    let idMap = this.genericMapper.map(this.validateNoteIdFromReq.bind(this), req.params)
    let noteMap = this.genericMapper.map(this.validateBodyFullJoiSchema.bind(this), req.body)
    return new Note(idMap.id, noteMap.topic, noteMap.description, req.name, noteMap.sessionId)
  }

  mapDeleteNoteToDomain (req) {
    let map = this.genericMapper.map(this.validateNoteIdFromReq.bind(this), req.params)
    return new Note(map.id, null, null, null, null)
  }

  validateBodyFullJoiSchema (note) {
    return Joi.validate(note, Joi.object({
      description: Joi.string().required().max(100),
      sessionId: Joi.string().required(),
      topic: Joi.string().required()
    }).required())
  }

  validateNoteIdFromReq (req) {
    return Joi.validate(req, Joi.object({
      id: Joi.string().required()
    }).required())
  }

  validateSessionId (note) {
    return Joi.validate(note, Joi.object({
      sessionId: Joi.string().required()
    }).required())
  }

  validateNotesJoiSchema (params) {
    return Joi.validate(params, Joi.object({
      sessionId: Joi.string().required(),
      type: Joi.string().allow()
    }).required())
  }
}

module.exports = NotesMapper
