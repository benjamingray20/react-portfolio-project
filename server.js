import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { getAllTeams, getTeamsWithPlayersAndStats } from './controllers/teams'
import { getAllPlayers, getPlayerByLastName, saveNewPlayer } from './controllers/players'
import { getAllCoaches, getCoachByLastName } from './controllers/coaches'

const app = express()

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/api/teams', getAllTeams)
app.get('/api/teams/:team', getTeamsWithPlayersAndStats)

app.get('/api/players', getAllPlayers)
app.get('/api/players/:lastName', getPlayerByLastName)
app.post('/api/players', bodyParser.json(), saveNewPlayer)

app.get('/api/coaches/', getAllCoaches)
app.get('/api/coaches/:lastName', getCoachByLastName)

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(1111, () => {
  console.log('Listening on port 1111...') // eslint-disable-line no-console
})
