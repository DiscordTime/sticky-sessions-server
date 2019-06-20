module.exports = {
  getDB: function (dbType) {
    var db
    switch (dbType) {
      case 'firestore':
      default:
        const FirestoreDB = require('./FirestoreDB')
        db = new FirestoreDB()
        break
    }
    return db
  }
}
