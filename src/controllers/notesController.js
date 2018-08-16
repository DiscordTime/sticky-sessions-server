var snapshotCallback = function (err, snapshot, res) {
  if (err) {
    console.err(err)
    res.send('ERROR!')
    return
  }

  var array = []
  snapshot.forEach(doc => {
    var data = doc.data()
    array.push(data)
  })
  res.send(array)
}

module.exports = function (proxy) {
  class NotesController {
    constructor (proxy) {
      this.proxy = proxy
    }

    getNotesFromSession (req, res) {
      var sessionId = req.params.sessionId
      proxy.getNotes(sessionId, res, snapshotCallback)
    }
  }
  return new NotesController(proxy)
}
