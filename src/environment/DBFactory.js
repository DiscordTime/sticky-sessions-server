const FirestoreDB = require('./FirestoreDB')

module.exports = {
  getDB: function (dbType) {
    switch (dbType) {
      case 'firestore':
      default:
        return new FirestoreDB()
    }
  }
}
