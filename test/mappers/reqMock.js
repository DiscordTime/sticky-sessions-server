class ReqMock {
  mockAddNoteCorrectReq () {
    return {
      body: {
        description: 'test note',
        session_id: 'abcz',
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
        session_id: 'abcz'
      }
    }
  }

  mockGetNoteTypeFilterCorrectReq () {
    return {
      query: {
        session_id: 'abcz'
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
