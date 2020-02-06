const Joi = require('joi')

class TeamController {
  constructor (teamRepository) {
    this.teamRepository = teamRepository
  }

  async getTeams (team) {
    this.validateTeam(team)
    return this.teamRepository.getTeam(team)
  }

  async getTeam (team) {
    this.validateTeamId(team)
    return this.teamRepository.getTeam(team.getIdObject())
  }

  async createTeam (team) {
    this.validateTeam(team)
    return this.teamRepository.createTeam(team.getTeam())
  }

  async editTeam (team) {
    this.validateFullTeam(team)
    return this.teamRepository.editTeam(team.id, team.getTeam())
  }

  async deleteTeam (team) {
    this.validateTeamId(team)
    return this.teamRepository.deleteTeam(team.id)
  }

  validateTeamId (team) {
    Joi.validate(team, Joi.object({
      id: Joi.string().required()
    }))
  }

  validateFullTeam (team) {
    Joi.validate(team, Joi.object({
      id: Joi.string().required(),
      topics: Joi.array().items(Joi.string()).required(),
      timestamp: Joi.date().timestamp().required()
    }))
  }

  validateTeam (team) {
    Joi.validate(team, Joi.object({
      topics: Joi.array().items(Joi.string()).required()
    }))
  }
}
module.exports = TeamController
