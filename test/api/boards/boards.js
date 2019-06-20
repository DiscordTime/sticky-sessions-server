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

var boardId
let board = {
  'name': 'test board',
  'topics': ['topic1', 'topic2']
}

describe('board API', function () {
  describe('/POST board', function () {
    it('Should insert a board', function () {
      return chai.request(app)
        .post('/boards')
        .send(board)
        .then((res) => {
          console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('object')

          expect(board.topics).deep.equal(res.body.topics)

          boardId = res.body.id
          board = res.body
        })
    })
  })

  describe('/GET a board', function () {
    it('Should get a board', function () {
      return chai.request(app)
        .get('/boards/' + boardId)
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')

          expect(res.body).deep.equal(board)

          board = res.body
        })
    })
  })

  describe('/GET all boards', function () {
    it('Should get all board', function () {
      return chai.request(app)
        .get('/boards')
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
        })
    })
  })

  describe('/PUT board', function () {
    it('Should update a board', function () {
      var newTopics = ['newTopic', 'topic2']
      board.topics = newTopics
      return chai.request(app)
        .put('/boards/' + boardId)
        .send(board)
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
    })
  })

  describe('/DELETE board', function () {
    it('Should delete board', function () {
      return chai.request(app)
        .delete('/boards/' + boardId)
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
    })
  })
})
