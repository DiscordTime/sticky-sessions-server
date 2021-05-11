class Router {
  constructor (mapper) {
    this.mapper = mapper
  }

  // Deprecate this in favor of version with model mapper function
  async executeOld (controllerFunction, req, res) {
    try {
      const model = this.mapper.mapToDomain(req)
      const response = await controllerFunction(model)
      if (response.message) {
        console.log('status==500')
        res.status(500)
        res.send({ error: response.message })
      } else {
        res.send(response)
      }
    } catch (error) {
      console.log(error)
      res.status(400)
      res.send({ error: error })
    }
  }

  async execute (controllerFunction, mapperFunction, req, res) {
    try {
      const model = await mapperFunction(req)
      const response = await controllerFunction(model)
      if (response.message) {
        console.log('status==500')
        console.log(response)
        res.status(500)
        res.send({ error: response.message })
      } else {
        res.send(response)
      }
    } catch (error) {
      console.log(error)
      res.status(400)
      res.send({ error: error })
    }
  }
}
module.exports = Router
