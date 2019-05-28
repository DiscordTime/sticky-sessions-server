const chai = require('chai')
const expect = chai.expect
const describe = require('mocha').describe
const it = require('mocha').it

const db = require('../db')
const RepositoriesProvider = require('./../../src/repositories')
const repositoriesProvider = new RepositoriesProvider(db)
const notesRepository = repositoriesProvider.provideNotesRepository()

describe('Notes Repository', function () {
  describe('getNotesFromSession() function', function () {
    it('Should get notes from session', async () => {
      const notes = await notesRepository.getNotes({ session_id: 1 })
      expect(notes).deep.equal([1, 2, 3])
    })
  })
})
