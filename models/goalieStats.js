export default (connection, Sequelize, players) => connection.define('goalieStats', {
  playerId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: players, key: 'id' } },
  gamesPlayed: { type: Sequelize.STRING, allowNull: false },
  wins: { type: Sequelize.INTEGER },
  losses: { type: Sequelize.INTEGER },
  GAA: { type: Sequelize.DECIMAL(3, 2) },
  savePercentage: { type: Sequelize.DECIMAL(3, 3) },
  shutouts: { type: Sequelize.INTEGER },

}, {
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
}, { paranoid: true })
