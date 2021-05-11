class FilterMapper {
  static toFirestore (key) {
    if (key === 'EQUALS') {
      return '=='
    }
    if (key === 'CONTAINS') {
      return 'array-contains'
    }
    if (key === 'NEQUALS') {
      return '!='
    }
    if (key === 'GREATERTHAN') {
      return '>'
    }
    if (key === 'SMALLERTHAN') {
      return '<'
    }
    if (key === 'CONTAINSANY') {
      return 'array-contains-any'
    }
    if (key === 'EQGREATERTHAN') {
      return '>='
    }
    if (key === 'EQSMALLERTHAN') {
      return '<='
    }
    return ''
  }
}

module.exports = FilterMapper
