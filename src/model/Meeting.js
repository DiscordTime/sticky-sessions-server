class Meeting {
  constructor (id, teamId, name, date, to, location, sessions) {
    this.id = id
    this.teamId = teamId
    this.name = name
    this.date = date
    this.to = to
    this.location = location
    this.sessions = sessions
  }

  getMeeting () {
    let meeting = {
      teamId: this.teamId,
      name: this.name,
      date: this.date,
      to: this.to,
      location: this.location
    }
    for (let field in meeting) {
      if (meeting[field] === undefined || meeting[field == null]) delete meeting[field]
    }
    return meeting
  }
}

module.exports = Meeting
