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
    const map = this.genericMapper.map(this.validateId.bind(this), req.params)
    return new Team(map.id, null, null, null)
  }

  mapCreateTeam (req) {
    const map = this.genericMapper.map(this.validateTeam.bind(this), req.body)
    return new Team(null, map.name, map.admin, map.members)
  }

  mapEditTeam (req) {
    const newTeam = { ...req.params, ...req.body }
    const map = this.genericMapper.map(this.validateTeamWithId.bind(this), newTeam)
    return new Team(map.id, map.name, map.admin, map.members)
  }

  mapDeleteTeam (req) {
    const map = this.genericMapper.map(this.validateId.bind(this), req.params)
    return new Team(map.id, null, null, null)
  }

  validateEmpty (team) {
    return Joi.object().required().validate(team)
  }

  validateId (team) {
    return Joi.object({
      id: Joi.string().required()
    }).required().validate(team)
  }

  validateTeamWithId (team) {
    return Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      admin: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }).validate(team)
  }

  validateTeam (team) {
    return Joi.object({
      name: Joi.string().required(),
      admin: Joi.string().required(),
      members: Joi.array().items(Joi.string()).required()
    }).validate(team)
  }
}

module.exports = TeamMapper
