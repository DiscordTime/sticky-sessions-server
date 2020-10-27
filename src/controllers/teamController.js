class TeamController {
  constructor (teamRepository) {
    this.teamRepository = teamRepository
  }

  async getTeams () {
    return this.teamRepository.getTeams()
  }

  async getTeam (team) {
    return this.teamRepository.getTeam(team)
  }

  async createTeam (team) {
    return this.teamRepository.createTeam(team)
  }

  async editTeam (team) {
    return this.teamRepository.editTeam(team)
  }

  async deleteTeam (team) {
    return this.teamRepository.deleteTeam(team.id)
  }
}

module.exports = TeamController
