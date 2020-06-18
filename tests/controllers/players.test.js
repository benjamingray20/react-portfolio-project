/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  afterEach, before, beforeEach, describe, it,
} = require('mocha')
const models = require('../../models')
const { getAllPlayers, getPlayerByLastName, saveNewPlayer } = require('../../controllers/players')
const {
  allPlayers, playerByLastName, createPlayer, singlePlayer, missingPlayerInfo,
} = require('../mocks/players')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - players', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.players, 'findAll')
    stubbedFindOne = sandbox.stub(models.players, 'findOne')
    stubbedCreate = sandbox.stub(models.players, 'create')

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


  describe('getAllPlayers', () => {
    it('retrieves a list of players from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(allPlayers)

      await getAllPlayers({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(allPlayers)
    })
  })

  describe('getPlayerByLastName', () => {
    // eslint-disable-next-line max-len
    it('retrieves the player with their stats associated with the provided last name from the database and calls response.send with it', async () => {
      const request = { params: { lastName: 'Krug' } }

      stubbedFindOne.returns(playerByLastName)

      await getPlayerByLastName(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        include: [
          { model: models.skaterStats },
          { model: models.goalieStats },
        ],
        where: {
          lastName: { [models.Op.like]: `%${request.params.lastName}%` },
        },
      })
      expect(stubbedSend).to.have.been.calledWith(playerByLastName)
    })
    it('returns a 404 when no player is found', async () => {
      const request = { params: { lastName: 'Krug' } }

      stubbedFindOne.returns(null)

      await getPlayerByLastName(request, response)

      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 with an error message when the database call throws an error', async () => {
      const request = { params: { lastName: 'Krug' } }

      stubbedFindOne.throws('ERROR!')

      await getPlayerByLastName(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        include: [
          { model: models.skaterStats },
          { model: models.goalieStats },
        ],
        where: {
          lastName: { [models.Op.like]: `%${request.params.lastName}%` },
        },
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve player, please try again')
    })
  })

  describe('saveNewPlayer', () => {
    // eslint-disable-next-line max-len
    it('accepts new player details and saves them as a new player, returning the saved record with a 201 status', async () => {
      const request = { body: createPlayer }

      stubbedCreate.returns(singlePlayer)

      await saveNewPlayer(request, response)

      expect(stubbedCreate).to.have.been.calledWith(createPlayer)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singlePlayer)
    })
    it('returns a 400 when player info is missing', async () => {
      const request = { body: missingPlayerInfo }

      await saveNewPlayer(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('The following fields are required: firstName, lastName, position, teamId')
    })
  })
})
