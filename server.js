const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

module.exports = function (config, proxy, router, controllers, db) {
  class Server {
    constructor (config, proxy, router, controllers, db) {
      this.config = config
      this.proxy = proxy
      this.router = router
      this.controllers = controllers
      this.db = db
    }

    start () {
      proxy.init(db)
      controllers.init(proxy)
      router.init(app, controllers)

      startListening(config.port)
    }
  }
  return new Server(config, proxy, router, controllers)
}

function startListening (port) {
  app.listen(process.env.PORT || port, (req, res) => {
    console.log('listening to port ' + port)
  })
}
