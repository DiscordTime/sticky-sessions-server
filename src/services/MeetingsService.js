class MeetingsService {
  constructor (meetingsRepository, sessionsRepository) {
    this.meetingsRepository = meetingsRepository
    this.sessionsRepository = sessionsRepository
  }

  async insertMeeting (meeting) {
    const result = await this.meetingsRepository.insertMeeting(meeting.getMeeting())
    if (!result.id) return { message: 'Could not insert meeting' }
    meeting.id = result.id

    for (let i = 0; i < meeting.sessions.length; i++) {
      let session = meeting.sessions[i]
      session.meetingId = meeting.id
      const sessionResult = await this.sessionsRepository
        .createSession(session.getSession())
      if (!sessionResult.id) return { message: 'Could not insert session' }
      meeting.sessions[i].id = sessionResult.id
    }

    return meeting
  }

  async getMeeting (filter) {
    return this.meetingsRepository.getMeeting(filter)
  }

  async updateMeeting (meeting) {
    return this.meetingsRepository.updateMeeting(meeting.id, meeting.getMeeting())
  }

  async deleteMeeting (meetingId) {
    return this.meetingsRepository.deleteMeeting(meetingId)
  }
}

module.exports = MeetingsService
