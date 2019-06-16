module.exports = {
  verifyToken: function (req, res, next) {
    const auth = require('firebase-admin').auth()
    const idToken = req.headers.token

    if (!idToken) {
      res.status(401).send({ error: 'Unauthorized: No token provided' })
    } else {
      auth.verifyIdToken(idToken)
        .then(function (decodedToken) {
          req.name = decodedToken.name
          req.email = decodedToken.email
          next()
        }).catch(function (error) {
          console.log(error)
          res.status(401).send({ error: 'Unauthorized: Invalid token' })
        })
    }
  }
}
