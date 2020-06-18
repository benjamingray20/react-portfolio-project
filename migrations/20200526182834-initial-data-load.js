/* eslint-disable max-len */
module.exports = {
  up: async (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    await queryInterface.bulkInsert('teams', [
      { location: 'Boston', mascot: 'Bruins', league: 'East' },
      { location: 'St Louis', mascot: 'Blues', league: 'West' },
    ])

    await queryInterface.bulkInsert('coaches', [
      { firstName: 'Bruce', lastName: 'Cassidy', teamId: '1' },
      { firstName: 'Craige', lastName: 'Berube', teamId: '2' },
    ])

    await queryInterface.bulkInsert('players', [
      { firstName: 'Brad', lastName: 'Marchand', position: 'LW', teamId: '1' },
      { firstName: 'David', lastName: 'Pastrnak', position: 'RW', teamId: '1' },
      { firstName: 'Torey', lastName: 'Krug', position: 'D', teamId: '1' },
      { firstName: 'Patrice', lastName: 'Bergeron', position: 'C', teamId: '1' },
      { firstName: 'Charlie', lastName: 'Coyle', position: 'C', teamId: '1' },
      { firstName: 'David', lastName: 'Krejci', position: 'C', teamId: '1' },
      { firstName: 'Jake', lastName: 'DeBrusk', position: 'LW', teamId: '1' },
      { firstName: 'Marcus', lastName: 'Johansson', position: 'LW', teamId: '1' },
      { firstName: 'Sean', lastName: 'Kuraly', position: 'C', teamId: '1' },
      { firstName: 'Matt', lastName: 'Grzelcyk', position: 'D', teamId: '1' },
      { firstName: 'Tuukka', lastName: 'Rask', position: 'G', teamId: '1' },
      { firstName: 'Ryan', lastName: 'O`Reilly', position: 'C', teamId: '2' },
      { firstName: 'Jaden', lastName: 'Schwartz', position: 'LW', teamId: '2' },
      { firstName: 'Alex', lastName: 'Pietrangelo', position: 'D', teamId: '2' },
      { firstName: 'Vladimir', lastName: 'Tarasenko', position: 'RW', teamId: '2' },
      { firstName: 'David', lastName: 'Perron', position: 'LW', teamId: '2' },
      { firstName: 'Tyler', lastName: 'Bozak', position: 'C', teamId: '2' },
      { firstName: 'Brayden', lastName: 'Schenn', position: 'C', teamId: '2' },
      { firstName: 'Colton', lastName: 'Parayko', position: 'D', teamId: '2' },
      { firstName: 'Oskar', lastName: 'Sundqvist', position: 'C', teamId: '2' },
      { firstName: 'Vince', lastName: 'Dunn', position: 'D', teamId: '2' },
      { firstName: 'Jordan', lastName: 'Binnington', position: 'G', teamId: '2' },
    ])

    await queryInterface.bulkInsert('skaterStats', [
      {
        playerId: '1', gamesPlayed: '24', goals: '9', assists: '14', points: '23', plusMinus: '4',
      },
      {
        playerId: '2', gamesPlayed: '24', goals: '9', assists: '10', points: '19', plusMinus: '0',
      },
      {
        playerId: '3', gamesPlayed: '24', goals: '2', assists: '16', points: '18', plusMinus: '4',
      },
      {
        playerId: '4', gamesPlayed: '24', goals: '9', assists: '8', points: '17', plusMinus: '4',
      },
      {
        playerId: '5', gamesPlayed: '24', goals: '9', assists: '7', points: '16', plusMinus: '8',
      },
      {
        playerId: '6', gamesPlayed: '24', goals: '4', assists: '12', points: '16', plusMinus: '5',
      },
      {
        playerId: '7', gamesPlayed: '24', goals: '4', assists: '7', points: '11', plusMinus: '4',
      },
      {
        playerId: '8', gamesPlayed: '22', goals: '4', assists: '7', points: '11', plusMinus: '0',
      },
      {
        playerId: '9', gamesPlayed: '20', goals: '4', assists: '6', points: '10', plusMinus: '4',
      },
      {
        playerId: '10', gamesPlayed: '20', goals: '4', assists: '4', points: '8', plusMinus: '-3',
      },
      {
        playerId: '12', gamesPlayed: '26', goals: '8', assists: '15', points: '23', plusMinus: '2',
      },
      {
        playerId: '13', gamesPlayed: '26', goals: '12', assists: '8', points: '20', plusMinus: '9',
      },
      {
        playerId: '14', gamesPlayed: '26', goals: '3', assists: '16', points: '19', plusMinus: '5',
      },
      {
        playerId: '15', gamesPlayed: '26', goals: '11', assists: '6', points: '17', plusMinus: '-5',
      },
      {
        playerId: '16', gamesPlayed: '26', goals: '7', assists: '9', points: '16', plusMinus: '4',
      },
      {
        playerId: '17', gamesPlayed: '26', goals: '5', assists: '8', points: '13', plusMinus: '-2',
      },
      {
        playerId: '18', gamesPlayed: '26', goals: '5', assists: '7', points: '12', plusMinus: '-2',
      },
      {
        playerId: '19', gamesPlayed: '26', goals: '2', assists: '10', points: '12', plusMinus: '6',
      },
      {
        playerId: '20', gamesPlayed: '25', goals: '4', assists: '5', points: '9', plusMinus: '5',
      },
      {
        playerId: '21', gamesPlayed: '20', goals: '2', assists: '6', points: '8', plusMinus: '-5',
      },
    ])

    return queryInterface.bulkInsert('goalieStats', [
      {
        playerId: '11', gamesPlayed: '24', wins: '15', losses: '9', GAA: '2.02', savePercentage: '.934', shutouts: '2',
      },
      {
        playerId: '22', gamesPlayed: '26', wins: '16', losses: '10', GAA: '2.46', savePercentage: '.914', shutouts: '1',
      },
    ])
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.bulkDelete('goalieStats', [])
    await queryInterface.bulkDelete('skaterStats', [])
    await queryInterface.bulkDelete('coaches', [])
    await queryInterface.bulkDelete('players', [])

    return queryInterface.bulkDelete('teams', [])
  },
}
