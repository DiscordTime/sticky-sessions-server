class Server {
  constructor (app, config, proxy, router, controllers, db) {
    this.app = app
    this.config = config
    this.proxy = proxy
    this.router = router
    this.controllers = controllers
    this.db = db
  }

  start () {
    this.router.init()

    this.startListening()
  }

  startListening () {
    var port = this.config.port
    this.app.listen(process.env.PORT || port, (req, res) => {
      console.log('listening to port ' + port)
    })
  }
}

module.exports = Server
