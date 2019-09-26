class TeamController {

  constructor (teamRepository) {
    this.teamRepository = teamRepository
  }

  async getTeam(team) {
    return this.teamRepository.getTeam(team)
  }

  async createTeam(team) {
    return this.teamRepository.createTeam(team)
  }
}

module.exports = TeamController
