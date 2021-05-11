class TeamFilter {
  getFilter () {
    return {
      id: '==',
      name: '==',
      admin: '==',
      members: 'contains'
    }
  }
}

module.exports = TeamFilter
