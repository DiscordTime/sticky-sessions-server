const express = require('express')
const BoardMapper = require('./mapper')
const Router = require('../router')

class BoardRouter {
  constructor (boardController) {
    this.boardMapper = new BoardMapper()
    this.app = express()
    this.boardController = boardController
    this.genericRouter = new Router(this.boardMapper)
  }

  getRoutes () {
    this.app.get('/', (req, res) => {
      this.genericRouter.execute(this.boardController.getAllBoards
        .bind(this.boardController), req, res)
    })

    this.app.get('/:id', (req, res) => {
      this.genericRouter.execute(this.boardController.getBoard
        .bind(this.boardController), req, res)
    })

    this.app.post('/', (req, res) => {
      this.genericRouter.execute(this.boardController.createBoard
        .bind(this.boardController), req, res)
    })

    this.app.put('/:id', (req, res) => {
      this.genericRouter.execute(this.boardController.editBoard
        .bind(this.boardController), req, res)
    })

    this.app.delete('/:id', (req, res) => {
      this.genericRouter.execute(this.boardController.deleteBoard
        .bind(this.boardController), req, res)
    })

    return this.app
  }
}

module.exports = BoardRouter
