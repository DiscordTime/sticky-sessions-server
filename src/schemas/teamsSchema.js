const Joi = require('joi')

module.exports = Joi.object().keys({
  administrator: Joi.string().email().required(),
  members: Joi.array().items(Joi.string().email().required()).required()
})
