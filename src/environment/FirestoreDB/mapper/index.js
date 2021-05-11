function mapDocumentToData (doc) {
  if (doc.exists) {
    const data = doc.data()
    data.id = doc.id
    return data
  }
  return {}
}

module.exports.mapSnapshotToArray = function (snapshot) {
  if (!snapshot.docs) {
    return mapDocumentToData(snapshot)
  }
  return snapshot.docs.map(
    doc => {
      return mapDocumentToData(doc)
    }
  )
}
