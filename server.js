class Server {
  constructor (app, config, router) {
    this.app = app
    this.config = config
    this.router = router
  }

  start () {
    this.router.init()
    this.startListening()
  }

  startListening () {
    const port = this.config.port
    this.app.listen(process.env.PORT || port, () => {
      console.log('listening to port ' + port)
    })
  }
}

module.exports = Server
