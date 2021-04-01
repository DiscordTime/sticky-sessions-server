class MeetRepository {
  constructor (db) {
    this.db = db
    this.table = 'meets'
  }

  async getMeets () {
    return this.db.executeGetDB(this.table)
  }

  async getMeet (meet) {
    return this.db.executeGetDB(this.table, meet)
  }

  async createMeet (meet) {
    return this.db.executeInsert(this.table, meet.getMeet())
  }

  async editMeet (meet) {
    return this.db.executeUpdateDB(this.table, meet.id, meet.getMeet())
  }

  async deleteMeet (id) {
    return this.db.executeDelete(this.table, id)
  }
}

module.exports = MeetRepository
