class Session {
    constructor (id, topics, timestamp) {
      this.id = id
      this.topics = topics,
      this.timestamp = timestamp
    }

    getSession () {
      return {
        id: this.id,
        topics: this.topics,
        timestamp: this.timestamp,
        table: 'session'
      }
    }
  }

  module.exports = Session
