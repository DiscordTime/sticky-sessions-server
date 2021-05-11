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
authStub.getAuthStub()

// Require app after mocking firebase token verification
const app = require('../../../index')

var sessionId
let meeting = {
    'meetId': '1',
}

let session = {
  'topics': ['topic1', 'topic2'],
  'timestamp': "2381789312",
  'meetId': meeting.meetId
}

describe('Session API', function () {
   describe('/POST session', function () {
     it('Should insert a session', function () {
       return chai.request(app)
         .post('/sessions')
         .send(session)
         .then((res) => {
           console.log(res.body)
           res.should.have.status(200)
           res.body.should.be.a('object')

           expect(session.topics).deep.equal(res.body.topics)

           sessionId = res.body.id
           session = res.body
         })
     })
   })

  describe('/GET a session', function () {
    it('Should get a session', function () {
      return chai.request(app)
        .get('/sessions/' + sessionId)
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')

          expect(res.body).deep.equal(session)

          session = res.body
        })
    })
  })

   describe('/GET all sessions', function () {
     it('Should get all session', function () {
       return chai.request(app)
         .get('/sessions/?meetId=' + meeting.meetId)
         .then((res) => {
           res.should.have.status(200)
           res.body.should.be.a('array')
         })
     })
   })

   describe('/PUT session', function () {
     it('Should update a session', function () {
       var newTopics = ['newTopic', 'topic2']
       session.topics = newTopics
       return chai.request(app)
         .put('/sessions/' + sessionId)
         .send(session)
         .then((res) => {
           res.should.have.status(200)
           res.body.should.be.a('object')
         })
     })
   })

   describe('/DELETE session', function () {
     it('Should delete session', function () {
       return chai.request(app)
         .delete('/sessions/' + sessionId)
         .then((res) => {
           res.should.have.status(200)
           res.body.should.be.a('object')
         })
     })
   })
})
