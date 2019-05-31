class Note {
  constructor (id, topic, description, user, sessionId) {
    this.id = id
    this.topic = topic
    this.description = description
    this.user = user
    this.sessionId = sessionId
  }

  getNote () {
    return {
      topic: this.topic,
      description: this.description,
      user: this.user,
      session_id: this.sessionId
    }
  }
}

module.exports = Note
