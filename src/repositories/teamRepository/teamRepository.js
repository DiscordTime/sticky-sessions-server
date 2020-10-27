class TeamRepository {
  constructor (db) {
    this.db = db
    this.table = 'teams'
  }

  async getTeams () {
    return this.db.executeGetDB(this.table)
  }

  async getTeam (team) {
    return this.db.executeGetDB(this.table, team)
  }

  async createTeam (team) {
    return this.db.executeInsert(this.table, team.getTeam())
  }

  async editTeam (team) {
    return this.db.executeUpdateDB(this.table, team.id, team.getTeam())
  }

  async deleteTeam (id) {
    return this.db.executeDelete(this.table, id)
  }
}

module.exports = TeamRepository
