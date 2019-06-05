module.exports = {
  getDB: function (dbType) {
    var db
    switch (dbType) {
      case 'firestore2':
        const FirestoreDB = require('./FirestoreDB')
        db = new FirestoreDB()
        break
      case 'firestore':
      default:
        db = require('./FirestoreDB/firestoreOld')
        break
    }
    return db
  }
}
