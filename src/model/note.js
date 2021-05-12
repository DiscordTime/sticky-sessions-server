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
      session_id: this.sessionId, //TODO: Remove redundancy used for retrocompatibility
      sessionId: this.sessionId
    }
  }

  getFilter () {
    return {
      id: 'EQUALS',
      topic: 'EQUALS',
      description: 'EQUALS',
      user: 'EQUALS',
      session_id: 'EQUALS', //TODO: Remove redundancy used for retrocompatibility 
      sessionId: 'EQUALS'
    }
  }
}

module.exports = Note
