class DBMock {
  getNotes (params, callback) {
    if (params.session_id === '-1') {
      callback(new Error('error'), null)
    } else {
      callback(null, { sessions: [1, 2, 3] })
    }
  }

  addNewNoteToSession (note, callback) {
    callback(null, note)
  }

  editNote (note, callback) {
    callback(null, note)
  }

  deleteNote (noteId, callback) {
    if (noteId === '-1') {
      callback(new Error('error'), null)
    } else {
      callback(null, noteId)
    }
  }
}

module.exports = new DBMock()
