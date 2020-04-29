class Router {
  constructor (mapper) {
    this.mapper = mapper
  }

  async execute (controllerFunction, req, res) {
    var model = this.mapper.mapToDomain(req)
    var response
    try {
      response = await controllerFunction(model)
      if (response.message) {
        console.log('status==500')
        res.status(500)
        res.send({ 'error': response.message })
      } else {
        res.send(response)
      }
    } catch (error) {
      res.status(400)
      res.send({ 'error': error.message })
    }
  }
}
module.exports = Router
