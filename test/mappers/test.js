const chai = require('chai')
const expect = chai.expect
// const expect = chai.assert
const describe = require('mocha').describe
const it = require('mocha').it

const ReqMock = require('./reqMock')
const reqMock = new ReqMock()

const NoteMapper = require('./../../src/router/noteRouter/mapper')
const noteMapper = new NoteMapper()

describe('Notes Router Mapper', function () {
  describe('Validating AddNote Mapper', function () {
    it('Should return a note', () => {
      expect(() => noteMapper.mapAddNoteToDomain(reqMock.mockAddNoteCorrectReq())).to.not.throw()
    })

    it('Should throw an Validation Error', () => {
      expect(() => noteMapper.mapAddNoteToDomain(reqMock.mockAddNoteNotCorrectReq())).to.throw()
    })
  })

  describe('Validating GetNote Mapper', function () {
    it('Should return a note', () => {
      expect(() => noteMapper.mapGetNotesQueryToDomain(reqMock.mockGetNoteCorrectReq())).to.not.throw()
    })

    it('Should return a note', () => {
      expect(() => noteMapper.mapGetNotesQueryToDomain(reqMock.mockGetNoteTypeFilterCorrectReq())).to.not.throw()
    })

    it('Should throw an Validation Error', () => {
      expect(() => noteMapper.mapGetNotesQueryToDomain(reqMock.mockGetNoteNotCorrectReq())).to.throw()
    })
  })
})
