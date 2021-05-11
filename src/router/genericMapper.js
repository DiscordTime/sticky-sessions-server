class GenericMapper {
  map (validateFunction, model) {
    const { error, value } = validateFunction(model)
    if (error) {
      throw error.details[0].message
    }
    console.log("value: " + JSON.stringify(value))
    return value
  }
}

module.exports = GenericMapper
