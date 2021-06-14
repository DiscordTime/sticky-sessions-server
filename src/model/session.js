class Session {
  constructor (id, topics, timestamp, meetId) {
    this.id = id
    this.topics = topics
    this.timestamp = timestamp
    this.meetId = meetId
  }

  getSession () {
    return {
      topics: this.topics,
      timestamp: this.timestamp
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
