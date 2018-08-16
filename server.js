const express = require('express')
const app = express()

const envPath = './src/environment/'

const dbFactory = require(envPath + 'DBFactory')

module.exports = function (config, proxy, router, controllers) {
  class Server {
    constructor (config, proxy, router, controllers) {
      this.config = config
      this.proxy = proxy
      this.router = router
      this.controllers = controllers
    }

    start () {
      var db = dbFactory.getDB(config.db)

      proxy.init(db)
      controllers.init(proxy)
      router.init(app, controllers)

      startListening(config.port)
    }
  }
  return new Server(config, proxy, router, controllers)
}

function startListening (port) {
  app.listen(port, (req, res) => {
    console.log('listening to port ' + port)
  })
}
