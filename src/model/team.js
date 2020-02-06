class Team {
  constructor (id, name, admin, members) {
    this.id = id
    this.name = name
    this.admin = admin
    this.members = members
  }

  getTeam () {
    return {
      name: this.name,
      admin: this.admin,
      members: this.members
    }
  }

  getIdObject () {
    return {
      id: this.id
    }
  }
}

module.exports = Team
