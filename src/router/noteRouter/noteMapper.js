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
      //Get all notes
      return new Note(null, null, null, null, map.session_id)
    } 
    return new Note(null, null, null, req.name, map.session_id)
  }

  mapAddNoteToDomain (req) {
    var map = this.genericMapper.map(this.validateBodyFullJoiSchema.bind(this), req.body) 
    return new Note(null, map.topic, map.description, req.name, map.session_id)
  }

  mapGetNotesQueryToDomain (req) {
    let map = this.genericMapper.map(this.validateNotesJoiSchema.bind(this), req.query)
    if (req.query.type === 'all') {
      return new Note(null, null, null, null, map.session_id)
    }
    return new Note(null, null, null, req.name, map.session_id)
  }

  mapEditNoteToDomain (req) {
    let idMap = this.genericMapper.map(this.validateNoteIdFromReq.bind(this), req.params)
    let noteMap = this.genericMapper.map(this.validateBodyFullJoiSchema.bind(this), req.body)
    return new Note(idMap.id, noteMap.topic, noteMap.description, req.name, noteMap.session_id)
  }

  mapDeleteNoteToDomain (req) {
    let map = this.genericMapper.map(this.validateNoteIdFromReq.bind(this), req.params)
    return new Note(map.id, null, null, null, null)
  }

  validateBodyFullJoiSchema (note) {
    return Joi.validate(note, Joi.object({
      description: Joi.string().required().max(100),
      session_id: Joi.string().required(),
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
      session_id: Joi.string().required()
    }).required())
  }

  validateNotesJoiSchema (params) {
    return Joi.validate(params, Joi.object({
      session_id: Joi.string().required(),
      type: Joi.string().allow()
    }).required())
  }

}

module.exports = NotesMapper
