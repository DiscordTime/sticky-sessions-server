class Session {
  constructor (id, meetingId, name, description, topics) {
    this.id = id
    this.meetingId = meetingId
    this.name = name
    this.description = description
    this.topics = topics
  }

  getSession () {
    return {
      meeting_id: this.meetingId,
      name: this.name,
      description: this.description,
      topics: this.topics
    }
  }
}

module.exports = Session
