const admin = require('firebase-admin')
const ssAccount = require('./keys/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(ssAccount)
})

const db = admin.firestore()

const tableInfo = {
  table_notes: 'notes',
  column_notes_session_id: 'sessionId',
  column_notes_description: 'description'
}

function executeQuery (query, callback) {
  query.get()
    .then(querySnapshot => {
      callback(null, querySnapshot)
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

module.exports.getNotes = function (sessionId, callback) {
  executeGet(tableInfo.table_notes, tableInfo.column_notes_session_id, sessionId, callback)
}
