const MeetingsSchema = require('./meetingsSchema')

class SchemasProvider {
  provideMeetingsSchema () {
    return new MeetingsSchema()
  }
}

module.exports = SchemasProvider
