const MeetingService = require('./MeetingsService')

class ServicesProvider {
  constructor (meetingsRepository, sessionsRepository) {
    this.meetingsRepository = meetingsRepository
    this.sessionsRepository = sessionsRepository
  }

  provideMeetingsService () {
    return new MeetingService(this.meetingsRepository, this.sessionsRepository)
  }
}

module.exports = ServicesProvider
