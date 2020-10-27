const Joi = require('joi')
const GenericMapper = require('../genericMapper')
const Team = require('../../model/team')

class TeamMapper {
  constructor () {
    this.genericMapper = new GenericMapper()
  }

  mapGetTeams (req) {
    return this.genericMapper.map(this.validateEmpty.bind(this), req.params)
  }

  mapGetTeam (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Team(map.id, null, null, null)
    return model
  }

  mapCreateTeam (req) {
    var map = this.genericMapper.map(this.validateTeam.bind(this), req.body)
    var model = new Team(null, map.name, map.admin, map.members)
    return model
  }

  mapEditTeam (req) {
    let newTeam = { ...req.params, ...req.body }
    var map = this.genericMapper.map(this.validateTeamWithId.bind(this), newTeam)
    var model = new Team(map.id, map.name, map.admin, map.members)
    return model
  }

  mapDeleteTeam (req) {
    var map = this.genericMapper.map(this.validateId.bind(this), req.params)
    var model = new Team(map.id, null, null, null)
    return model
  }

  validateEmpty (team) {
    return Joi.validate(team, Joi.object().required())
  }

  validateId (team) {
    return Joi.validate(team, Joi.object({
      id: Joi.string().required()
    }).required())
  }

  validateTeamWithId (team) {
    var model = Joi.validate(team, Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      admin: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }))

    return model
  }

  validateTeam (team) {
    var model = Joi.validate(team, Joi.object({
      name: Joi.string().required(),
      admin: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }))

    return model
  }
}

module.exports = TeamMapper
