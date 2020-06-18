const allTeams = [{
  id: 1,
  location: 'Boston',
  mascot: 'Bruins',
  league: 'East',
}, {
  id: 2,
  location: 'St Louis',
  mascot: 'Blues',
  conference: 'West',
}]

const teamWithPlayersAndStats = [{
  id: 1,
  location: 'Boston',
  mascot: 'Bruins',
  league: 'East',
  players: {
    id: 11,
    firstName: 'Tuukka',
    lastName: 'Rask',
    position: 'G',
    teamId: 1,

    skaterStat: null,
    goalieStat: {
      playerId: 11,
      gamesPlayed: '24',
      wins: 15,
      losses: 9,
      GAA: '2.02',
      savePercentage: '0.934',
      shutouts: 2,
    },
  },
}]

module.exports = { allTeams, teamWithPlayersAndStats }
