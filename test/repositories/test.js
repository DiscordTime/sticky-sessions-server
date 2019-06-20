const chai = require('chai')
const expect = chai.expect
const describe = require('mocha').describe
const it = require('mocha').it

const db = require('../db')
const RepositoriesProvider = require('./../../src/repositories')
const repositoriesProvider = new RepositoriesProvider(db)
const notesRepository = repositoriesProvider.provideNotesRepository()

const Note = require('./../../src/model/note')

describe('Notes Repository', function () {
  describe('getNotesFromSession() function', function () {
    it('Should get notes from session', async () => {
      var note = new Note()
      note.sessionId = 1
      const notes = await notesRepository.getNotes(note.getNote())
      expect(notes).deep.equal([1, 2, 3])
    })
  })
})
