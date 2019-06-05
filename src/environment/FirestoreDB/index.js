const admin = require('firebase-admin')
const ssAccount = require('./keys/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(ssAccount)
})

const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

class FirestoreDB {
  async executeQueryDB (query) {
    try {
      var snapshot = await query.get()
      const mapper = require('./mapper')
      var result = await mapper.mapSnapshotToArrayAsync(snapshot)
      return result
    } catch (err) {
      console.error('Error getting snapshot', err)
      throw err
    }
  }

  async executeGetDB (table, data) {
    var query = db.collection(table)

    if (data) {
      for (var item in data) {
        if (data[item] !== undefined && data[item] !== null) {
          query = query.where(item, '==', data[item])
        }
      }
    }

    return this.executeQueryDB(query)
  }

  async executeInsert (table, docData) {
    try {
      const ref = await db.collection(table).add(docData)
      if (ref.id) {
        docData['id'] = ref.id
        return docData
      } else {
        return 'Error adding document. Could not create an unique id'
      }
    } catch (err) {
      return err
    }
  }

  async executeDelete (table, docId) {
    return db.collection(table).doc(docId).delete()
  }

  async executeUpdateDB (table, docId, docData) {
    try {
      return await db.collection(table).doc(docId).update(docData)
    } catch (err) {
      return err
    }
  }
}

module.exports = FirestoreDB
