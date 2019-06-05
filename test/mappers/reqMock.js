class ReqMock {
  mockAddNoteCorrectReq () {
    return {
      body: {
        user: 'userTest',
        description: 'test note',
        session_id: 'abcz',
        topic: 'start'
      }
    }
  }

  mockAddNoteNotCorrectReq () {
    return {
      body: {
        user: 'userTest',
        description: 'test note',
        topic: 'start'
      }
    }
  }
}

module.exports = ReqMock
