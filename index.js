const config = require('./keys/config')
const env = require('./src/environment')
const server = require('./server')(config, env.proxy, env.router, env.controllers)

console.log(config)
console.log(server)

server.start()
