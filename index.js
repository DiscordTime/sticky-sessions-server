const config = require('./config')
const env = require('./src/environment')

const envPath = './src/environment/'
const dbFactory = require(envPath + 'DBFactory')
const db = dbFactory.getDB(config.db)

const server = require('./server')(config, env.proxy, env.router, env.controllers, db)

console.log(config)
console.log(server)

server.start()
