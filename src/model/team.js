class Team {
  constructor (id, name, admin, members) {
    this.id = id
    this.name = name
    this.admin = admin
    this.members = members
  }

  // returns javascript object representation of team model
  getTeam () {
    return {
      id: this.id,
      name: this.name,
      admin: this.admin,
      members: this.members
    }
  }
}

module.exports = Team
