class MeetController {
  constructor (meetRepository) {
    this.meetRepository = meetRepository
  }

  async getMeets () {
    return this.meetRepository.getMeets()
  }

  async getMeet (meet) {
    return this.meetRepository.getMeet(meet)
  }

  async createMeet (meet) {
    return this.meetRepository.createMeet(meet)
  }

  async editMeet (meet) {
    return this.meetRepository.editMeet(meet)
  }

  async deleteMeet (meet) {
    return this.meetRepository.deleteMeet(meet.id)
  }
}

module.exports = MeetController
