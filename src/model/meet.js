class Meet {
  constructor (id, date, idTeam, members) {
    this.id = id
    this.date = date
    this.idTeam = idTeam
    this.members = members
  }

  // returns javascript object representation of team model
  getMeet () {
    return {
      id: this.id,
      date: this.date,
      idTeam: this.idTeam,
      members: this.members
    }
  }

  getFilter () {
    return {
      id: 'EQUALS',
      date: 'EQUALS',
      idTeam: 'EQUALS',
      members: 'CONTAINS'
    }
  }
}

module.exports = Meet
