class SessionsRepository {
  constructor (db) {
    this.db = db
    console.log(this.db)
  }
}

module.exports = SessionsRepository
