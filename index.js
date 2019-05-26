const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const config = require('./config')
const env = require('./src/environment')

const envPath = './src/environment/'
const dbFactory = require(envPath + 'DBFactory')
const db = dbFactory.getDB(config.db)

const Proxy = env.proxy
const proxy = new Proxy(db)

const ControllerProvider = env.controllers
const controllerProvider = new ControllerProvider(proxy)

const RouterProvider = env.router
const routerProvider = new RouterProvider(app, controllerProvider)

const Server = require('./server')
const server = new Server(app, config, proxy, routerProvider, controllerProvider, db)

console.log(config)
console.log(server)

server.start()
