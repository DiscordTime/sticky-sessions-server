const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const admin = require('firebase-admin')
const ssAccount = require('./src/environment/FirestoreDB/keys/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(ssAccount)
})

const config = require('./config')
const env = require('./src/environment')
const RepositoriesProvider = require('./src/repositories')

const envPath = './src/environment/'
const dbFactory = require(envPath + 'DBFactory')
const db = dbFactory.getDB(config.db)

const repositories = new RepositoriesProvider(db)
const noteRepository = repositories.provideNoteRepository()
const sessionRepository = repositories.provideSessionRepository()
const boardRepository = repositories.provideBoardRepository()

const ControllersProvider = env.controllers
const controllersProvider = new ControllersProvider(noteRepository, sessionRepository, boardRepository)

const auth = require('./src/middlewares/auth')
const RouterProvider = env.router
const routerProvider = new RouterProvider(app, controllersProvider, auth)

const Server = require('./server')
const server = new Server(app, config, routerProvider)

// todo: if production env log this.
// console.log(config)
// console.log(server)

server.start()

// Export the app for testing
module.exports = app
