export default (connection, Sequelize, players) => connection.define('skaterStats', {
  playerId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: players, key: 'id' } },
  gamesPlayed: { type: Sequelize.STRING, allowNull: false },
  goals: { type: Sequelize.INTEGER },
  assists: { type: Sequelize.INTEGER },
  points: { type: Sequelize.INTEGER },
  plusMinus: { type: Sequelize.INTEGER },
}, {
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
}, { paranoid: true })
