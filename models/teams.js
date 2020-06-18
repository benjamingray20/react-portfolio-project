export default (connection, Sequelize) => connection.define('teams', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  location: { type: Sequelize.STRING, allowNull: false },
  mascot: { type: Sequelize.STRING, allowNull: false },
  league: { type: Sequelize.ENUM('East', 'West'), allowNull: false },
}, {
  defaultScope: {
    attributes: { exclude: ['deletedAt'] },
  },
}, { paranoid: true })
