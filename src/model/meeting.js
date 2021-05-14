class Meeting {
  constructor (id, date, teamId, members) {
    this.id = id
    this.date = date
    this.teamId = teamId
    this.members = members
  }

  // returns javascript object representation of team model
  getMeeting () {
    let res = {
      teamId: this.teamId
    }

    if (this.date) {
      res.date = this.date
    }
    if (this.members) {
      res.members = this.members
    }

    return res
  }

  getFilter () {
    return {
      id: 'EQUALS',
      date: 'EQUALS',
      teamId: 'EQUALS',
      members: 'CONTAINS'
    }
  }
}

module.exports = Meeting
