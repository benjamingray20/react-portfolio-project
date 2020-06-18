module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    await queryInterface.createTable('teams', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      location: { type: Sequelize.STRING, allowNull: false },
      mascot: { type: Sequelize.STRING, allowNull: false },
      league: { type: Sequelize.ENUM('East', 'West'), allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('coaches', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      teamId: { type: Sequelize.INTEGER, references: { model: 'teams', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('players', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      position: { type: Sequelize.ENUM('C', 'LW', 'RW', 'D', 'G'), allowNull: false },
      teamId: { type: Sequelize.INTEGER, references: { model: 'teams', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('skaterStats', {
      playerId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'players', key: 'id' } },
      gamesPlayed: { type: Sequelize.STRING, allowNull: false },
      goals: { type: Sequelize.INTEGER },
      assists: { type: Sequelize.INTEGER },
      points: { type: Sequelize.INTEGER },
      plusMinus: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    return queryInterface.createTable('goalieStats', {
      playerId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'players', key: 'id' } },
      gamesPlayed: { type: Sequelize.STRING, allowNull: false },
      wins: { type: Sequelize.INTEGER },
      losses: { type: Sequelize.INTEGER },
      GAA: { type: Sequelize.DECIMAL(3, 2) },
      savePercentage: { type: Sequelize.DECIMAL(3, 3) },
      shutouts: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.dropTable('goalieStats')
    await queryInterface.dropTable('skaterStats')
    await queryInterface.dropTable('players')
    await queryInterface.dropTable('coaches')


    return queryInterface.dropTable('teams')
  },
}
