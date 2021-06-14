// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

const describe = mocha.describe
const it = mocha.it
const expect = chai.expect

// Configure chai
chai.use(chaiHttp)
chai.should()

const authStub = require('../auth')
const userName = 'Tester'
authStub.getAuthStub(userName)

// Require app after mocking firebase token verification
const app = require('../../../index')

var noteId
let note = {
  'topic': 'test',
  'description': 'API Testing',
  'sessionId': 'test'
}

describe('Notes API', function () {
  describe('/POST notes', function () {
    it('Should insert a note', function () {
      return chai.request(app)
        .post('/notes')
        .send(note)
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')

          expect(res.body.topic).to.equal(note.topic)

          noteId = res.body.id
        })
    })
  })

  describe('/GET notes from sessions using query params', function () {
    it('Should get notes from session', function () {
      return chai.request(app)
        .get('/notes')
        .query({ sessionId: note.sessionId })
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')

          var insertedNote = {
            'topic': note.topic,
            'description': note.description,
            'sessionId': note.sessionId,
            'id': noteId,
            'user': userName
          }

          expect(res.body).deep.contains(insertedNote)
        })
    })
  })

  describe('/PUT notes', function () {
    it('Should update a note', function () {
      var newDescription = 'updated note'
      note.description = newDescription
      return chai.request(app)
        .put('/notes/' + noteId)
        .send(note)
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
    })
  })

  describe('/DELETE note', function () {
    it('Should delete note', function () {
      return chai.request(app)
        .delete('/notes/' + noteId)
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
    })
  })
})
