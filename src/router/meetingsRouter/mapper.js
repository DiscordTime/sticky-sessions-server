const Meeting = require('../../model/Meeting')
const Session = require('../../model/Session')

class MeetingMapper {
  mapToDomain ({ body, query, params }) {
    const meeting = new Meeting(body.id ? body.id : params.meeting_id,
      query.team_id ? query.team_id : body.team_id, body.name, body.date, body.to, body.location, [])

    if (body.sessions !== undefined) {
      body.sessions.map(session => {
        meeting.sessions.push(new Session(session.id, session.meeting_id, session.name, session.description, session.topics))
      })
    }
    return meeting
  }
}

module.exports = MeetingMapper
