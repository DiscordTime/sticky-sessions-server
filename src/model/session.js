class Session {
  constructor (id, topics, timestamp, meetId) {
    this.id = id
    this.topics = topics
    this.timestamp = timestamp
    this.meetId = this.meetId
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

  getFilter () {
    return {
      id: 'EQUALS',
      meetId: 'EQUALS',
      topics: 'CONTAINS',
      timestamp: 'EQUALS'
    }
  }
}

module.exports = Session
