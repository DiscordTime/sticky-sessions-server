class MeetingController {
  constructor (meetingRepository) {
    this.meetingRepository = meetingRepository
  }

  async getMeetings (meeting) {
    return this.meetingRepository.getMeetings(meeting)
  }

  async getMeeting (meeting) {
    return this.meetingRepository.getMeeting(meeting)
  }

  async createMeeting (meeting) {
    return this.meetingRepository.createMeeting(meeting)
  }

  async editMeeting (meeting) {
    return this.meetingRepository.editMeeting(meeting.id, meeting)
  }

  async deleteMeeting (meeting) {
    return this.meetingRepository.deleteMeeting(meeting.id)
  }
}

module.exports = MeetingController
