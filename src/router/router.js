class Router {
    constructor (mapper) {
      this.mapper = mapper
    }

    execute(controllerFunction, req, res) {
        var model = this.mapper.mapToDomain(req)
        var response
        try {
            response = await controllerFunction(model)
        } catch (error) {
            res.status(400)
            res.send({ 'error': error })
            return
        }
        if (response.message) {
            res.status(500)
            res.send({ 'error': response.message })
            return
        }
    }
}
module.exports = Router