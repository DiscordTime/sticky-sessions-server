module.exports.mapSnapshotToArray = function (snapshot, callback) {
  var array = []
  snapshot.forEach(doc => {
    var data = doc.data()
    data['id'] = doc.id
    array.push(data)
  })
  callback(array)
}

module.exports.mapSnapshotToArrayAsync = async function (snapshot) {
  var array = []
  snapshot.forEach(doc => {
    var data = doc.data()
    data['id'] = doc.id
    array.push(data)
  })
  return array
}
