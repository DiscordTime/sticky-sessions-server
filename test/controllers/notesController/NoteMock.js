class NoteMock {
  createReqNotesSessions (sessionId, user) {
    return {
      params: {
        session_id: sessionId,
        user: user
      }
    }
  }

  createReqAddNote (description, user, sessionId, topic) {
    return {
      body: {
        description: description,
        user: user,
        session_id: sessionId,
        topic: topic
      }
    }
  }

  createReqEditNote (id, description, user, sessionId, topic) {
    return {
      body: {
        id: id,
        description: description,
        user: user,
        session_id: sessionId,
        topic: topic
      }
    }
  }

  createReqDeleteNote (id) {
    return {
      params: {
        note_id: id
      }
    }
  }

  createRes () {
    return {
      sendCalledWith: '',
      statusCalledWith: 200,
      status: function (arg) {
        this.statusCalledWith = arg
      },
      send: function (arg) {
        this.sendCalledWith = arg
      }
    }
  }

  createEmptyReq () {
    return {
      body: { }
    }
  }
}

module.exports = new NoteMock()
