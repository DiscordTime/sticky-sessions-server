
const sinon = require('sinon')
const auth = require('../../../src/middlewares/auth')

class AuthStub {
  constructor () {
    if (!AuthStub.instance) {
      this.stub = sinon.stub(auth, 'verifyToken')
        .callsFake(function (req, _, next) {
          req.name = 'Tester'
          return next()
        })
      AuthStub.instance = this
    }
    return AuthStub.instance
  }
}

module.exports.getAuthStub = function () {
  const instance = new AuthStub()
  Object.freeze(instance)
}
