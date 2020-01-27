const SchemaProvider = require('../schemas')

class MeetingsController {
  constructor (service) {
    this.service = service
    this.schema = new SchemaProvider().provideMeetingsSchema()
  }

  async insertMeeting (meeting) {
    validateMeeting(meeting, this.schema.getInsertMeetingSchema())
    return this.service.insertMeeting(meeting)
  }

  async getMeeting (meetingFilter) {
    validateMeeting(meetingFilter, this.schema.getGetMeetingSchema())
    return this.service.getMeeting(meetingFilter)
  }

  async updateMeeting (meeting) {
    validateMeeting(meeting, this.schema.getUpdateMeetingSchema())
    return this.service.updateMeeting(meeting)
  }

  async deleteMeeting (meeting) {
    validateMeeting(meeting, this.schema.getDeleteMeetingSchema())
    return this.service.deleteMeeting(meeting.id)
  }
}

function validateMeeting (meeting, validator) {
  validator.validate(meeting)
}

module.exports = MeetingsController
