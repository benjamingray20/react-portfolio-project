import models from '../models'

export const getAllPlayers = async (request, response) => {
  const players = await models.players.findAll({
  })

  return response.send(players)
}

export const getPlayerByLastName = async (request, response) => {
  try {
    const { lastName } = request.params
    const player = await models.players.findOne({
      where: {
        lastName: { [models.Op.like]: `%${lastName}%` },
      },

      include: [
        { model: models.skaterStats },
        { model: models.goalieStats },
      ],
    })

    return player
      ? response.send(player)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to retrieve player, please try again')
  }
}

export const saveNewPlayer = async (request, response) => {
  try {
    const {
      firstName, lastName, position, teamId,
    } = request.body

    if (!firstName || !lastName || !position || !teamId) {
      return response
        .status(400)
        .send('The following fields are required: firstName, lastName, position, teamId')
    }

    const newPlayer = await models.players.create({
      firstName, lastName, position, teamId,
    })

    return response.status(201).send(newPlayer)
  } catch (error) {
    return response.status(500).send('Unable to save player, please try again')
  }
}
