export default (connection, Sequelize, teams) => connection.define('players', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.ENUM('C', 'LW', 'RW', 'D', 'G'), allowNull: false },
  teamId: { type: Sequelize.INTEGER, references: { model: teams, key: 'id' } },

}, {
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
}, { paranoid: true })
