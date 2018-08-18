const admin = require('firebase-admin')
const ssAccount = require('./keys/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(ssAccount)
})

const db = admin.firestore()
const settings = {timestampsInSnapshots: true}
db.settings(settings)

var FieldValue = require('firebase-admin').firestore.FieldValue

const tableInfo = {
  table_notes: 'notes',
  column_notes_session_id: 'sessionId',
  column_notes_description: 'description',
  table_sessions: 'sessions'
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

function executeGet (table, column, data, callback) {
  var query = db.collection(table)
  if (data) {
    query = query.where(column, '==', data)
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
      docData['id'] = ref.id
      callback(null, docData)
    })
    .catch(err => {
      callback(err, null)
    })
}

module.exports.getNotes = function (sessionId, callback) {
  executeGet(tableInfo.table_notes, tableInfo.column_notes_session_id, sessionId, callback)
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
