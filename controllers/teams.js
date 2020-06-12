import models from '../models'

export const getAllTeams = async (request, response) => {
  const teams = await models.teams.findAll({
  })

  return teams
    ? response.send(teams)
    : response.sendStatus(404)
}

export const getTeamsWithPlayersAndStats = async (request, response) => {
  try {
    const { team } = request.params
    const teams = await models.teams.findOne({
      where: {
        [models.Op.or]: [
          { location: { [models.Op.like]: `%${team}%` } },
          { mascot: { [models.Op.like]: `%${team}%` } },
        ],
      },
      include: [
        {
          model: models.players,
          include: [
            { model: models.skaterStats },
            { model: models.goalieStats },
          ],
        },
      ],
    })

    return teams
      ? response.send(teams)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve team, please try again')
  }
}
