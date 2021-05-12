
const sinon = require('sinon')
const auth = require('../../../src/middlewares/auth')

class AuthStub {
  constructor (userName) {
    if (!AuthStub.instance) {
      this.stub = sinon.stub(auth, 'verifyToken')
        .callsFake(function (req, _, next) {
          req.name = userName
          return next()
        })
      AuthStub.instance = this
    }
    return AuthStub.instance
  }
}

module.exports.getAuthStub = function (userName) {
  const instance = new AuthStub(userName)
  Object.freeze(instance)
}
