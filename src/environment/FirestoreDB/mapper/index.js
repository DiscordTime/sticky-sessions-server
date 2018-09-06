module.exports.mapSnapshotToArray = function (snapshot, callback) {
  var array = []
  snapshot.forEach(doc => {
    var data = doc.data()
    array.push(data)
  })
  callback(array)
}
