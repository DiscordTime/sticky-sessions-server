class NoteMock {
  createReqNotesSessions (sessionId, user) {
    let req = {
      params: {
        session_id: sessionId,
        user: user
      }
    }
    return req
  }

  createReqAddNote (description, user, sessionId, topic) {
    let req = {
      body: {
        description: description,
        user: user,
        session_id: sessionId,
        topic: topic
      }
    }
    return req
  }

  createReqEditNote (id, description, user, sessionId, topic) {
    let req = {
      body: {
        id: id,
        description: description,
        user: user,
        session_id: sessionId,
        topic: topic
      }
    }
    return req
  }

  createReqDeleteNote (id) {
    let req = {
      params: {
        note_id: id
      }
    }
    return req
  }

  createRes () {
    let res = {
      sendCalledWith: '',
      statusCalledWith: 200,
      status: function (arg) {
        this.statusCalledWith = arg
      },
      send: function (arg) {
        this.sendCalledWith = arg
      }
    }
    return res
  }

  createEmptyReq () {
    return {
      body: { }
    }
  }
}

module.exports = new NoteMock()
