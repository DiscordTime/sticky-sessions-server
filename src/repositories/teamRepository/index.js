class TeamRepository {
  constructor (db) {
    this.db = db
    this.table = 'teams'
  }

  async getTeam (team) {
    return this.db.executeGetDB(this.table, team)
  }

  async createTeam (team) {
    return this.db.executeInsert(this.table, team)
  }

  async deleteTeam (id) {
    return this.db.executeDelete(this.table, id)
  }

  async editTeam (id, team) {
    return this.db.executeUpdateDB(this.table, id, team)
  }
}

module.exports = TeamRepository
