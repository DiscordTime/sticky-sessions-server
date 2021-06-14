class MeetingRepository {
  constructor (db) {
    this.db = db
    this.table = 'meetings'
  }

  async getMeetings (meeting) {
    return this.db.executeGetDB(this.table, meeting)
  }

  async getMeeting (meeting) {
    return this.db.executeGetDB(this.table, meeting)
  }

  async createMeeting (meeting) {
    return this.db.executeInsert(this.table, meeting.getMeeting())
  }

  async editMeeting (id, meeting) {
    delete meeting.id
    return this.db.executeUpdateDB(this.table, id, meeting.getMeeting())
  }

  async deleteMeeting (id) {
    return this.db.executeDelete(this.table, id)
  }
}

module.exports = MeetingRepository
