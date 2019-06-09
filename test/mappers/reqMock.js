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

  mockGetNoteCorrectReq () {
    return {
      query: {
        user: 'userTest',
        session_id: 'abcz'
      }
    }
  }

  mockGetNoteNotCorrectReq () {
    return {
      query: {
        user: 'userTest'
      }
    }
  }
}

module.exports = ReqMock
