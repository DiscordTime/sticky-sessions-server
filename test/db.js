class DBMock {
  async executeGetDB (table, data) {
    console.log(table)
    if (!data.sessionId) {
      throw new Error('No session id passed')
    } else if (data.sessionId === -1) {
      throw new Error('invalid session id')
    } else {
      return [1, 2, 3]
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
