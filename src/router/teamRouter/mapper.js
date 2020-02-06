const Team = require('../../model/team')

class TeamMapper {
  mapToDomain (req) {
    if (req.query.name !== undefined) {
      return new Team(
        null,
        req.query.name,
        null
      )
    }

    return new Team(
      req.params.id,
      req.body.name,
      req.body.admin,
      req.body.members
    )
  }
}

module.exports = TeamMapper
