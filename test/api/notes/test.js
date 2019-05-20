const expect = require('chai').expect
const describe = require('mocha').describe
const it = require('mocha').it

const db = require('./db')
const proxy = require('./../../../src/environment/proxy')
proxy.init(db)
const notesController = require('./../../../src/controllers/notesController')(proxy)

const noteMock = require('./NoteMock')

describe('Notes Controller', function () {
  describe('getNotesFromSession() function', function () {
    it('Should get notes from session', function () {
      var req = noteMock.createReqNotesSessions('1', 'Test')
      var res = noteMock.createRes()

      notesController.getNotesFromSession(req, res)

      expect(res.statusCalledWith).to.equal(200)
      console.log(res.sendCalledWith)
    })

    it('Should throw error', function () {
      var req = noteMock.createReqNotesSessions('-1', null)
      var res = noteMock.createRes()
      notesController.getNotesFromSession(req, res)

      expect(res.statusCalledWith).to.equal(503)
    })
  })

  describe('addNewNoteToSession() function', function () {
    it('Should create new note', function () {
      var req = noteMock.createReqAddNote('Note Test', 'Test', '1', 'Gain & Pleasure')
      var res = noteMock.createRes()

      notesController.addNewNoteToSession(req, res)

      expect(res.statusCalledWith).to.equal(200)
      expect(res.sendCalledWith.description).to.equal(req.body.description)
    })

    it('Should throw error', function () {
      var req = noteMock.createEmptyReq()
      var res = noteMock.createRes()

      notesController.addNewNoteToSession(req, res)

      expect(res.statusCalledWith).to.equal(400)
      expect(res.sendCalledWith.name).to.equal('ValidationError')
      expect(res.sendCalledWith.isJoi).to.equal(true)
    })
  })

  describe('editNote() function', function () {
    it('Should edit a note', function () {
      var req = noteMock.createReqEditNote('1', 'Note Updated', 'Test', '1', 'Gain & Pleasure')
      var res = noteMock.createRes()

      notesController.editNote(req, res)

      expect(res.statusCalledWith).to.equal(200)
      expect(res.sendCalledWith.description).to.equal(req.body.description)
    })

    it('Should throw error', function () {
      var req = noteMock.createEmptyReq()
      var res = noteMock.createRes()

      notesController.editNote(req, res)

      expect(res.statusCalledWith).to.equal(400)
      expect(res.sendCalledWith.name).to.equal('ValidationError')
      expect(res.sendCalledWith.isJoi).to.equal(true)
    })
  })

  describe('deleteNote() function', function () {
    it('Should delete a note', function () {
      var req = noteMock.createReqDeleteNote('1')
      var res = noteMock.createRes()

      notesController.deleteNote(req, res)

      expect(res.statusCalledWith).to.equal(200)
      expect(res.sendCalledWith).to.equal(req.params.note_id)
    })

    it('Should throw error', function () {
      var req = noteMock.createReqDeleteNote('-1')
      var res = noteMock.createRes()

      notesController.deleteNote(req, res)

      expect(res.statusCalledWith).to.equal(503)
    })
  })
})
