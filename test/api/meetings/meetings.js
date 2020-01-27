// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

const describe = mocha.describe
const it = mocha.it

// Configure chai
chai.use(chaiHttp)
chai.should()

const authStub = require('../auth')
authStub.getAuthStub()

// Require app after mocking firebase token verification
const app = require('../../../index')

let meetingId
let meeting = {
  'teamId': 'test',
  'name': 'Teste',
  'date': '1584131049',
  'to': '1584131049',
  'location': 'Test',
  'sessions': [
    {
      'name': 'Test',
      'description': 'Test',
      'topics': [
        'test',
        'test',
        'test'
      ]
    }
  ]
}
describe('Meetings API', function () {
  describe('/POST meeting', function () {
    it('Should insert a meeting', function () {
      return chai.request(app)
        .post('/meetings/')
        .send(meeting)
        .then(function (res) {
          res.body.id.should.be.a('string')
          res.body.sessions[0].id.should.be.a('string')
          meetingId = res.body.id
        })
    })
  })

  describe('/GET meeting', function () {
    it('Should get meetings', function () {
      return chai.request(app)
        .get('/meetings/')
        .then(function (res) {
          res.body.should.be.a('array')
          res.body[0].id.should.be.a('string')
        })
    })
  })

  describe('/POST meeting/edit', function () {
    it('Should edit meeting', function () {
      meeting.name = 'Test 2'
      return chai.request(app)
        .post('/meetings/edit/' + meetingId)
        .send(meeting)
        .then(function (res) {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
    })
  })

  describe('/DETETE meeting', function () {
    it('Should delete meeting', function () {
      meeting.name = 'Test 2'
      return chai.request(app)
        .delete('/meetings/' + meetingId)
        .then(function (res) {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
    })
  })
})
