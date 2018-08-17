var dataCallback = function (err, data, res) {
  if (err) {
    console.err(err)
    res.send(err)
    return
  }
  res.send(data)
}

module.exports = function (proxy) {
  class SessionsController {
    constructor (proxy) {
      this.proxy = proxy
    }

    getSession (req, res) {
      var sessionId = req.params.sessionId
      proxy.getSession(sessionId, res, dataCallback)
    }
  }
  return new SessionsController(proxy)
}
