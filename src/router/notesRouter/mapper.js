const Note = require('../../model/note')

class NotesMapper {
  mapFromRouteToDomain (req) {
    return new Note(
      req.body.topic,
      req.body.description,
      req.body.user,
      req.body.session_id
    )
  }
}

module.exports = NotesMapper
