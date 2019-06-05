const admin = require('firebase-admin')

const db = admin.firestore()

var FieldValue = require('firebase-admin').firestore.FieldValue

const tableInfo = {
  table_notes: 'notes',
  column_notes_session_id: 'session_id',
  column_notes_description: 'description',
  table_sessions: 'sessions',
  session_status_closed: 'closed'
}

function executeUpdate (table, id, data, callback) {
  db.collection(table).doc(id).update(data)
    .then(snapshot => {
      executeGetDoc(table, id, callback)
    })
    .catch(err => {
      console.error('Error updating object', err)
      callback(err)
    })
}

function executeQuery (query, callback) {
  query.get()
    .then(querySnapshot => {
      callback(null, querySnapshot)
    })
    .catch(err => {
      console.error('Error getting snapshot', err)
      callback(err, null)
    })
}

function executeDocQuery (query, callback) {
  query.get()
    .then(doc => {
      if (doc.exists) {
        var data = doc.data()
        data['id'] = doc.id
        callback(null, data)
      } else {
        callback()
      }
    })
    .catch(err => {
      console.error('Error getting document', err)
      callback(err, null)
    })
}

function executeGet (table, data, callback) {
  var query = db.collection(table)

  if (data) {
    for (var item in data) {
      query = query.where(item, '==', data[item])
    }
  }
  executeQuery(query, callback)
}

function executeGetDoc (table, docId, callback) {
  var query = db.collection(table)
  if (docId) {
    query = query.doc(docId)
  }
  executeDocQuery(query, callback)
}

function executeAddDoc (table, docData, callback) {
  db.collection(table).add(docData)
    .then(ref => {
      if (ref.id) {
        docData['id'] = ref.id
      }
      callback(null, docData)
    })
    .catch(err => {
      console.log('Error adding document', err)
      callback(err, null)
    })
}

function executeDeleteDoc (table, docId, callback) {
  db.collection(table).doc(docId).delete()
    .then(resp => {
      callback(null, resp)
    })
    .catch(err => {
      console.log('Error deleting document', err)
      callback(err, null)
    })
}

module.exports.getSessions = function (callback) {
  executeGet(tableInfo.table_sessions, null, (err, snapshot) => {
    if (err) {
      callback(err, null)
      return
    }
    const mapper = require('./mapper')
    mapper.mapSnapshotToArray(snapshot, (sessions) => {
      callback(null, sessions)
    })
  })
}

module.exports.getSession = function (sessionId, callback) {
  executeGetDoc(tableInfo.table_sessions, sessionId, callback)
}

module.exports.createSession = function (topics, callback) {
  var session = {
    topics: topics,
    timestamp: FieldValue.serverTimestamp()
  }
  executeAddDoc(tableInfo.table_sessions, session, callback)
}

module.exports.closeSession = function (sessionId, callback) {
  const data = { status: tableInfo.session_status_closed }
  executeUpdate(tableInfo.table_sessions, sessionId, data, callback)
}

module.exports.editSession = function (session, callback) {
  const sessionId = session.id
  delete session.id
  executeUpdate(tableInfo.table_sessions, sessionId, session, callback)
}

module.exports.getNotes = function (params, callback) {
  executeGet(tableInfo.table_notes, params, (err, snapshot) => {
    if (err) {
      callback(err, null)
      return
    }

    const mapper = require('./mapper')
    mapper.mapSnapshotToArray(snapshot, (sessions) => {
      callback(null, sessions)
    })
  })
}

module.exports.addNewNoteToSession = function (note, callback) {
  executeAddDoc(tableInfo.table_notes, note, callback)
}

module.exports.editNote = function (note, callback) {
  const noteId = note.id
  delete note.id
  executeUpdate(tableInfo.table_notes, noteId, note, callback)
}

module.exports.deleteNote = function (noteId, callback) {
  executeDeleteDoc(tableInfo.table_notes, noteId, callback)
}
