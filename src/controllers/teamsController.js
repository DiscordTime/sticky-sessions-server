const Joi = require('joi')

function getDefaultJoiCreateTeamSchema () {
  return Joi.object().keys({
    name: Joi.string().required(),
    members: Joi.array().items(Joi.string()).required()
  })
}

module.exports = function (proxy) {
  class TeamsController {
    constructor (proxy) {
      this.proxy = proxy
    }

    createTeam (req, res) {
      const team = req.body
      Joi.validate(team, getDefaultJoiCreateTeamSchema(), function (err, value) {
        if (err) {
          res.status(400)
          res.send(err)
          return
        }

        if (team.members.length === 0) {
          res.status(400)
          res.send({ 'message': 'Array of members must not be empty.' })
          return
        }
        proxy.createTeam(value, (err, createdTeam) => {
          if (err) {
            console.log(err)
            res.status(400)
            res.send(err)
            return
          }
          res.send(createdTeam)
        })
      })
    }
  }
  return new TeamsController(proxy)
}
