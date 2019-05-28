const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const config = require('./config')
const env = require('./src/environment')
const RepositoriesProvider = require('./src/repositories')

const envPath = './src/environment/'
const dbFactory = require(envPath + 'DBFactory')
const db = dbFactory.getDB(config.db)

const repositories = new RepositoriesProvider(db)
const notesRepository = repositories.provideNotesRepository()
const sessionsRepository = repositories.provideSessionsRepository()

const ControllersProvider = env.controllers
const controllersProvider = new ControllersProvider(notesRepository, sessionsRepository)

const RouterProvider = env.router
const routerProvider = new RouterProvider(app, controllersProvider)

const Server = require('./server')
const server = new Server(app, config, routerProvider)

console.log(config)
console.log(server)

server.start()
