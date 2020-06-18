/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const {
  afterEach, before, beforeEach, describe, it,
} = require('mocha')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { getAllCoaches, getCoachByLastName } = require('../../controllers/coaches')
const { allCoaches, coachByLastName } = require('../mocks/coaches')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - coaches', () => {
  let response
  let sandbox
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.coaches, 'findAll')
    stubbedFindOne = sandbox.stub(models.coaches, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })
  describe('getAllCoaches', () => {
    it('retrieves a list of coaches from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(allCoaches)

      await getAllCoaches({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(allCoaches)
    })
  })

  describe('getCoachByLastName', () => {
    // eslint-disable-next-line max-len
    it('retrieves the coach with their team associated with the provided last name from the database and calls response.send with it', async () => {
      const request = { params: { lastName: 'Cassidy' } }

      stubbedFindOne.returns(coachByLastName)

      await getCoachByLastName(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        include: [
          { model: models.teams },
        ],
        where: {
          lastName: { [models.Op.like]: `%${request.params.lastName}%` },
        },
      })
      expect(stubbedSend).to.have.been.calledWith(coachByLastName)
    })
    it('returns a 404 when no coach is found', async () => {
      const request = { params: { lastName: 'Cassidy' } }

      stubbedFindOne.returns(null)

      await getCoachByLastName(request, response)

      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 status when an error occurs retrieving the coach by lastName', async () => {
      const request = { params: { lastName: 'Cassidy' } }

      stubbedFindOne.throws('ERROR!')

      await getCoachByLastName(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        include: [
          { model: models.teams },
        ],
        where: {
          lastName: { [models.Op.like]: `%${request.params.lastName}%` },
        },
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve coach, please try again')
    })
  })
})
