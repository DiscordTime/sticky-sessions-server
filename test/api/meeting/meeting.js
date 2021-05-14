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
authStub.getAuthStub('Tester')
// Require app after mocking firebase token verification
const app = require('../../../index')

let url = '/meetings'

let teamId = Math.random().toString(36).substring(7)
let date = '31279312193'

let team = {
  'id': teamId,
  'name': 'TeamName',
  'admin': 'admin@gmail.com',
  'members': ['john@gmail.com', 'dawg@gmail.com']
}

let members = team.members.concat('jogndawg@gmail.com')

let meeting = {
  'date': date,
  'teamId': teamId,
  'members': members
}

var insertedMeeting

describe('Meeting API', function () {
  describe('/POST meeting', function () {
    it('Should insert a meeting', async function () {
      const res = await chai.request(app)
        .post(url)
        .send(meeting)
      res.should.have.status(200)
      res.body.should.be.a('object')
      expect(meeting.members).deep.equal(res.body.members)
      insertedMeeting = res.body
    })
  })

  describe('/GET all meetings', function () {
    it('Should get all meetings', function () {
      return chai.request(app)
        .get(url)
        .then((res) => {
          console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('array')
        })
    })
  })

  describe('/GET meetings from team', function () {
    it('Should get all meetings from a team', function () {
      return chai.request(app)
        .get(url + '?teamId=' + teamId)
        .then((res) => {
          console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('array')
        })
    })
  })

  describe('/GET a meeting', function () {
    it('Should get a meeting', async function () {
      const res = await chai.request(app)
        .get(url + '/' + insertedMeeting.id)
      res.should.have.status(200)
      res.body.should.be.a('object')
      expect(res.body).deep.equal(insertedMeeting)
    })
  })

  describe('/PUT meeting', function () {
    it('Should update a meeting', async function () {
      let newMembers = ['newMember@gmail.com', 'newMember2@gmail.com']
      meeting.members = newMembers
      const res = await chai.request(app)
        .put(url + '/' + insertedMeeting.id)
        .send(meeting)
      res.should.have.status(200)
      res.body.should.be.a('object')
    })
  })

  describe('/DELETE meeting', function () {
    it('Should delete a meeting', async function () {
      const res = await chai.request(app)
        .delete(url + '/' + insertedMeeting.id)
      res.should.have.status(200)
      res.body.should.be.a('object')
    })
  })
})
