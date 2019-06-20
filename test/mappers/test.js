const chai = require('chai')
const expect = chai.expect
// const expect = chai.assert
const describe = require('mocha').describe
const it = require('mocha').it

const ReqMock = require('./reqMock')
const reqMock = new ReqMock()

const NotesMapper = require('./../../src/router/notesRouter/mapper')
const notesMapper = new NotesMapper()

describe('Notes Router Mapper', function () {
  describe('Validating AddNote Mapper', function () {
    it('Should return a note', () => {
      expect(() => notesMapper.mapAddNoteToDomain(reqMock.mockAddNoteCorrectReq())).to.not.throw()
    })

    it('Should throw an Validation Error', () => {
      expect(() => notesMapper.mapAddNoteToDomain(reqMock.mockAddNoteNotCorrectReq())).to.throw()
    })
  })

  describe('Validating GetNote Mapper', function () {
    it('Should return a note', () => {
      expect(() => notesMapper.mapGetNotesQueryToDomain(reqMock.mockGetNoteCorrectReq())).to.not.throw()
    })

    it('Should return a note', () => {
      expect(() => notesMapper.mapGetNotesQueryToDomain(reqMock.mockGetNoteTypeFilterCorrectReq())).to.not.throw()
    })

    it('Should throw an Validation Error', () => {
      expect(() => notesMapper.mapGetNotesQueryToDomain(reqMock.mockGetNoteNotCorrectReq())).to.throw()
    })
  })
})
