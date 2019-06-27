const Joi = require('joi')

class BoardController {
  constructor (boardRepository) {
    this.boardRepository = boardRepository
  }

  async getAllBoards (Board) {
    console.log('getAllBoards')
    return this.boardRepository.getAllBoards(Board.getBoard())
  }

  async getBoard (Board) {
    this.validateBoardId(Board)
    return this.boardRepository.getBoard(Board.getIdObject())
  }

  async createBoard (Board) {
    this.validateBoard(Board)
    return this.boardRepository.createBoard(Board.getBoard())
  }

  async deleteBoard (Board) {
    this.validateBoardId(Board)
    return this.boardRepository.deleteBoard(Board.id)
  }

  async editBoard (Board) {
    this.validateFullBoard(Board)
    return this.boardRepository.editBoard(Board.id, Board.getBoard())
  }

  validateBoardId (Board) {
    Joi.validate(Board, Joi.object({
      id: Joi.string().required()
    }))
  }

  validateFullBoard (Board) {
    Joi.validate(Board, Joi.object({
      id: Joi.string().required(),
      topics: Joi.array().items(Joi.string()).required(),
      name: Joi.string().required()
    }))
  }

  validateBoard (Board) {
    Joi.validate(Board, Joi.object({
      topics: Joi.array().items(Joi.string()).required(),
      name: Joi.string().required()
    }))
  }
}
module.exports = BoardController
