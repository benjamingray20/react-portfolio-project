import fetchPlayers from '../actions/players'

export const filterPlayers = (list, term) => list.filter(player => (
  player.lastName.toLowerCase().includes(term.toLowerCase()) ||
  player.firstName.toLowerCase().includes(term.toLowerCase())
))

export const retrievePlayers = async () => {
  const players = await fetchPlayers()

  return players
}
