import Sequelize from 'sequelize'
import allConfigs from '../config/sequelize'
import teamsModel from './teams'
import coachesModel from './coaches'
import playersModel from './players'
import skaterStatsModel from './skaterStats'
import goalieStatsModel from './goalieStats'


const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const teams = teamsModel(connection, Sequelize)
const coaches = coachesModel(connection, Sequelize, teams)
const players = playersModel(connection, Sequelize, teams)
const skaterStats = skaterStatsModel(connection, Sequelize, players)
const goalieStats = goalieStatsModel(connection, Sequelize, players)

players.belongsTo(teams)
teams.hasMany(players)

teams.hasOne(coaches)
coaches.belongsTo(teams)

skaterStats.belongsTo(players)
players.hasOne(skaterStats)

players.hasOne(goalieStats)
goalieStats.belongsTo(players)

export default {
  teams,
  coaches,
  players,
  skaterStats,
  goalieStats,
  Op: Sequelize.Op,
}
