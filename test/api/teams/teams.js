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

let name = Math.random().toString(36).substring(7)
let newMembers = ['jane@gmail.com', 'doe@gmail.com']

let team = {
  'name': name,
  'admin': 'admin@gmail.com',
  'members': ['john@gmail.com', 'dawg@gmail.com']
}

describe('Team API', function () {
  describe('/POST team', function () {
    it('Should insert a team', async function () {
      const res = await chai.request(app)
        .post('/teams')
        .send(team)

      res.should.have.status(200)
      res.body.should.be.a('object')

      console.log(res.body)

      expect(team.members).deep.equal(res.body.members)

      team = res.body
    })
  })

  describe('/GET a team', function () {
    it('Should get a team', async function () {
      const res = await chai.request(app)
        .get('/teams/' + team.id)

      res.should.have.status(200)
      res.body.should.be.a('object')

      expect(res.body).deep.equal(team)
    })
  })

  describe('/PUT team', function () {
    it('Should update a team', async function () {
      team.members = newMembers
      const res = await chai.request(app)
        .put('/teams/' + team.id)
        .send(team)

      res.should.have.status(200)
      res.body.should.be.a('object')
    })
  })

  describe('/GET a updated team by name', function () {
    it('Should get a team by name and verify that newMembers were updated ', async function () {
      const res = await chai.request(app)
        .get('/teams/')
        .query({ name: team.name })

      res.should.have.status(200)
      res.body.should.be.a('array')

      expect(res.body[0].members).deep.equal(newMembers)
    })
  })

  describe('/DELETE team', function () {
    it('Should delete a team', async function () {
      const res = await chai.request(app)
        .delete('/teams/' + team.id)
      res.should.have.status(200)
      res.body.should.be.a('object')
    })
  })
})
