const Joi = require('joi')

module.exports = Joi.object().keys({
  id: Joi.string(),
  meeting_id: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  topics: Joi.array().items(Joi.string())
})
