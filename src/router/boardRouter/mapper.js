const Board = require('../../model/board')

class BoardMapper {
  mapToDomain (req) {
    return new Board(
      req.params.id,
      req.body.topics,
      req.body.timestamp
    )
  }
}

module.exports = BoardMapper
