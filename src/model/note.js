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

  getFilter () {
    return {
      id: 'EQUALS',
      topic: 'EQUALS',
      description: 'EQUALS',
      user: 'EQUALS',
      sessionId: 'EQUALS',
    }
  }
}

module.exports = Note
