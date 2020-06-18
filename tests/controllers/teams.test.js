/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  afterEach, before, beforeEach, describe, it,
} = require('mocha')
const models = require('../../models')
const { getAllTeams, getTeamsWithPlayersAndStats } = require('../../controllers/teams')
const { allTeams, teamWithPlayersAndStats } = require('../mocks/teams')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - teams', () => {
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

    stubbedFindAll = sandbox.stub(models.teams, 'findAll')
    stubbedFindOne = sandbox.stub(models.teams, 'findOne')

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

  describe('getAllTeams', () => {
    it('retrieves a list of teams from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(allTeams)

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(allTeams)
    })
  })

  describe('getTeamWithPlayersAndStats', () => {
    // eslint-disable-next-line max-len
    it('retrieves the team with its players and stats associated with the provided team name from the database and calls response.send with it', async () => {
      const request = { params: { team: 'Bruins' } }

      stubbedFindOne.returns(teamWithPlayersAndStats)

      await getTeamsWithPlayersAndStats(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        include: [
          {
            model: models.players,
            include: [
              { model: models.skaterStats },
              { model: models.goalieStats },
            ],
          },
        ],
        where: {
          [models.Op.or]: [
            { location: { [models.Op.like]: `%${request.params.team}%` } },
            { mascot: { [models.Op.like]: `%${request.params.team}%` } },
          ],
        },
      })
      expect(stubbedSend).to.have.been.calledWith(teamWithPlayersAndStats)
    })
    it('returns a 404 when no team is found', async () => {
      const request = { params: { team: 'Bruins' } }

      stubbedFindOne.returns(null)

      await getTeamsWithPlayersAndStats(request, response)

      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 status when an error occurs retrieving the team with players and their stats', async () => {
      const request = { params: { team: 'Bruins' } }

      stubbedFindOne.throws('ERROR!')

      await getTeamsWithPlayersAndStats(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        include: [
          {
            model: models.players,
            include: [
              { model: models.skaterStats },
              { model: models.goalieStats },
            ],
          },
        ],
        where: {
          [models.Op.or]: [
            { location: { [models.Op.like]: `%${request.params.team}%` } },
            { mascot: { [models.Op.like]: `%${request.params.team}%` } },
          ],
        },
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve team, please try again')
    })
  })
})
