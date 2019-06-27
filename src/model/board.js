class Board {
  constructor (id, topics, name) {
    this.id = id
    this.topics = topics
    this.name = name
  }

  getBoard () {
    var resp = {}
    if (this.topics !== undefined) {
      resp['topics'] = this.topics
    }
    if (this.name !== undefined) {
      resp['name'] = this.name
    }
    return resp
  }

  getIdObject () {
    return {
      id: this.id
    }
  }
}

module.exports = Board
