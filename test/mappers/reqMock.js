class ReqMock {
  mockAddNoteCorrectReq () {
    return {
      body: {
        description: 'test note',
        sessionId: 'abcz',
        topic: 'start'
      }
    }
  }

  mockAddNoteNotCorrectReq () {
    return {
      body: {
        description: 'test note',
        topic: 'start'
      }
    }
  }

  mockGetNoteCorrectReq () {
    return {
      query: {
        sessionId: 'abcz'
      }
    }
  }

  mockGetNoteTypeFilterCorrectReq () {
    return {
      query: {
        sessionId: 'abcz'
      },
      name: 'Tester'
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
