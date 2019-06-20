class Session {
  constructor (id, topics, timestamp) {
    this.id = id
    this.topics = topics
    this.timestamp = timestamp
  }

  getSession () {
    var resp = {}
    if (this.topics !== undefined) {
      resp['topics'] = this.topics
    }
    if (this.timestamp !== undefined) {
      resp['timestamp'] = this.timestamp
    }
    return resp
  }

  getIdObject () {
    return {
      id: this.id
    }
  }
}

module.exports = Session
