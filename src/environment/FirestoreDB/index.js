const admin = require('firebase-admin')
const FilterMapper = require('../FilterMapper')
const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

class FirestoreDB {
  async executeQueryDB (query) {
    try {
      var snapshot = await query.get()
      const mapper = require('./mapper')
      var result = mapper.mapSnapshotToArray(snapshot)
      return result
    } catch (err) {
      console.error('Error getting snapshot', err)
      throw err
    }
  }

  async executeGetDB (table, data) {
    if (data && Object.keys(data).length === 0 && data.constructor === Object) {
      data = undefined
    }

    console.log('Going to GET', data, 'on ', table)
    var query = db.collection(table)

    if (data) {
      console.log('filtering')
      var filter = data.getFilter()
      for (var field in data) {
        if (data[field] !== undefined && data[field] !== null) {
          if (field === 'id') {
            query = query.doc(data[field])
          } else {
            if (filter[field] !== undefined && filter[field] !== null) {
              query = query.where(field, FilterMapper.toFirestore(filter[field]), data[field])
            } else {
              query = query.where(field, '==', data[field])
            }
          }
        }
      }
    }

    return this.executeQueryDB(query)
  }

  async executeInsert (table, docData) {
    console.log('Going to insert: ', docData, ' on ', table)
    try {
      const ref = await db.collection(table).add(docData)
      console.log('inserted.')
      if (ref.id) {
        docData['id'] = ref.id
        console.log('returning. docData = ', docData)
        return docData
      } else {
        return 'Error adding document. Could not create an unique id'
      }
    } catch (err) {
      return err
    }
  }

  async executeDelete (table, docId) {
    console.log('Going to delete: ', docId, ' on ', table)
    return db.collection(table).doc(docId).delete()
  }

  async executeUpdateDB (table, docId, docData) {
    console.log('Going to update: id = ', docId, 'with this data ', docData,
      ' on ', table)
    try {
      return await db.collection(table).doc(docId).update(docData)
    } catch (err) {
      return err
    }
  }
}

module.exports = FirestoreDB
