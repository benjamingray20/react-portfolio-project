export default (connection, Sequelize, teams) => connection.define('coaches', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  teamId: { type: Sequelize.INTEGER, references: { model: teams, key: 'id' } },
}, {
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
}, { paranoid: true })
