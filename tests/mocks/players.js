const allPlayers = [{
  id: 1,
  firstName: 'Brad',
  lastName: 'Marchand',
  position: 'LW',
  teamId: '1',
}, {
  id: 2,
  firstName: 'David',
  lastName: 'Pastrnak',
  position: 'RW',
  teamId: '1',
}]

const playerByLastName = [{
  id: 3,
  firstName: 'Torey',
  lastName: 'Krug',
  position: 'D',
  teamId: 1,

  skaterStat: {
    playerId: 3,
    gamesPlayed: '24',
    goals: 2,
    assists: 16,
    points: 18,
    plusMinus: 4,
  },
  goalieStat: null,
}]

const createPlayer = {
  firstName: 'Patrice',
  lastName: 'Bergeron',
  position: 'C',
  teamId: 1,
}

const singlePlayer = {
  id: 4,
  firstName: 'Patrice',
  lastName: 'Bergeron',
  position: 'C',
  teamId: 1,
}

const missingPlayerInfo = [{
  firstName: 'Patrice',
  lastName: 'Bergeron',
  teamId: 1,
}]


module.exports = {
  allPlayers, playerByLastName, createPlayer, singlePlayer, missingPlayerInfo,
}
