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
let insertedTeam = team
describe('Team API', function () {
  describe('/POST team', function () {
    it('Should insert a team', async function () {
      const res = await chai.request(app)
        .post('/teams')
        .send(team)
      res.should.have.status(200)
      res.body.should.be.a('object')
      expect(team.members).deep.equal(res.body.members)
      insertedTeam = res.body
    })
  })
  describe('/GET all teams', function () {
    it('Should get all teams', function () {
      return chai.request(app)
        .get('/teams')
        .then((res) => {
          console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('array')
        })
    })
  })
  describe('/GET a team', function () {
    it('Should get a team', async function () {
      const res = await chai.request(app)
        .get('/teams/' + insertedTeam.id)
      res.should.have.status(200)
      res.body.should.be.a('object')
      expect(res.body).deep.equal(insertedTeam)
    })
  })
  describe('/PUT team', function () {
    it('Should update a team', async function () {
      team.members = newMembers
      const res = await chai.request(app)
        .put('/teams/' + insertedTeam.id)
        .send(team)
      res.should.have.status(200)
      res.body.should.be.a('object')
    })
  })
  describe('/DELETE team', function () {
    it('Should delete a team', async function () {
      const res = await chai.request(app)
        .delete('/teams/' + insertedTeam.id)
      res.should.have.status(200)
      res.body.should.be.a('object')
    })
  })
})
