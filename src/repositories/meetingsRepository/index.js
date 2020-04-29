class MeetingsRepository {
  constructor (db) {
    this.db = db
  }

  async insertMeeting (meeting) {
    return this.db.executeInsert('/meetings', meeting)
  }

  async getMeeting (filter) {
    return this.db.executeGetDB('/meetings', filter)
  }

  async updateMeeting (meetingId, meeting) {
    return this.db.executeUpdateDB('/meetings', meetingId, meeting)
  }

  async deleteMeeting (meetingId) {
    return this.db.executeDelete('/meetings', meetingId)
  }
}

module.exports = MeetingsRepository
