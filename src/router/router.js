class Router {
  constructor (mapper) {
    this.mapper = mapper
  }

  async execute (controllerFunction, mapperFunction, req, res) {
    try {
      let model = await mapperFunction(req)
      let response = await controllerFunction(model)
      if (response.message) {
        console.log('status==500')
        console.log(response)
        res.status(500)
        res.send({ 'error': response.message })
      } else {
        res.send(response)
      }
    } catch (error) {
      console.log(error)
      res.status(400)
      res.send({ 'error': error })
    }
  }
}
module.exports = Router
