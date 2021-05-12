class GenericMapper {
  map (validateFunction, model) {
    const { error, value } = validateFunction(model)
    if (error) {
      throw error.details[0].message
    }
    return value
  }
}

module.exports = GenericMapper
