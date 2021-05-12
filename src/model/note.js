class Note {
  constructor (id, topic, description, user, session_id) {
    this.id = id
    this.topic = topic
    this.description = description
    this.user = user
    this.session_id = session_id
  }

  getNote () {
    return {
      topic: this.topic,
      description: this.description,
      user: this.user,
      session_id: this.session_id,
    }
  }

  getFilter () {
    return {
      id: 'EQUALS',
      topic: 'EQUALS',
      description: 'EQUALS',
      user: 'EQUALS',
      session_id: 'EQUALS'
    }
  }
}

module.exports = Note
