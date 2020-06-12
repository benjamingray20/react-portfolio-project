/* eslint-disable object-curly-newline */
import fetchStatsForPlayer from '../actions/stats'

export const getPlayerLastNameFromUrl = location => (location && location.pathname
  ? location.pathname.split('/').pop()
  : ''

)
export const retrievePlayersStats = async (location) => {
  const playerLastName = getPlayerLastNameFromUrl(location)

  const { id, firstName, lastName, position, teamId, stats } = await fetchStatsForPlayer(playerLastName)

  if (!id || !firstName || !lastName || !position || !teamId || !stats) {
    return { lastName: '', details: {}, stats: [] }
  }
  return { id, stats, details: { id, firstName, lastName, position, teamId } }
}
