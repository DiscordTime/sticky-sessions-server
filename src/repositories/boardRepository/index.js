class BoardsRepository {
  constructor (db) {
    this.db = db
    this.table = 'boards'
  }

  async getBoard (board) {
    return this.db.executeGetDB(this.table, board)
  }

  // todo : remove unused params
  // eslint-disable-next-line no-use-before-define
  async getAllBoards (board) {
    console.log(board)
    return this.db.executeGetDB(this.table)
  }

  async createBoard (board) {
    return this.db.executeInsert(this.table, board)
  }

  async deleteBoard (id) {
    return this.db.executeDelete(this.table, id)
  }

  async editBoard (id, board) {
    return this.db.executeUpdateDB(this.table, id, board)
  }
}

module.exports = BoardsRepository
