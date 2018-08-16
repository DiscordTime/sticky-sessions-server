module.exports = {
  getDB: function (dbType) {
    var db
    switch (dbType) {
      case 'firestore':
      default:
        db = require('./FirestoreDB')
        break
    }
    return db
  }
}
