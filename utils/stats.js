/* eslint-disable object-curly-newline */
import fetchStatsForPlayer from '../actions/stats'

export const getPlayerLastNameFromUrl = location => (location && location.pathname
  ? location.pathname.split('/').pop()
  : ''

)
export const retrievePlayersStats = async (location) => {
  const playerLastName = getPlayerLastNameFromUrl(location)

  // eslint-disable-next-line max-len
  const { id, firstName, lastName, position, teamId, skaterStat, goalieStat } = await fetchStatsForPlayer(playerLastName)

  if (!id || !firstName || !lastName || !position || !teamId) {
    return { id: 0, details: {}, skaterStat: [], goalieStat: [] }
  }
  return { skaterStat, goalieStat, details: { id, firstName, lastName, position, teamId } }
}
