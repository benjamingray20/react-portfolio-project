import React, { useEffect, useState } from 'react'
import Page from '../components/page'
import Title from '../components/title'
import GoBack from '../components/goBack'
import PlayerDetails from '../components/playerDetails'
import SkaterStats from '../components/SkaterStats'
import GoalieStats from '../components/goalieStats'
// import GoalieStats from '../components/GoalieStats'
import { retrievePlayersStats } from '../utils/stats'

export default ({ location }) => {
  const [playersLastName, setPlayersLastName] = useState('')
  const [player, setPlayer] = useState({})
  const [skaterStats, setSkaterStats] = useState({})
  const [goalieStats, setGoalieStats] = useState({})

  useEffect(() => {
    async function pullData() {
      const { skaterStat, goalieStat, details } = await retrievePlayersStats(location)

      setPlayersLastName(details.lastName)
      setPlayer(details)
      setSkaterStats(skaterStat)
      setGoalieStats(goalieStat)
    }

    pullData()
  }, [])
  if (!playersLastName) {
    return (<div>Sorry, player not found</div>)
  }
  return (
    <Page>
      <Title />
      <GoBack />
      <PlayerDetails firstName={player.firstName} lastName={player.lastName} position={player.position} />
      {
        skaterStats
          ? (
            <>
              <SkaterStats
                key={skaterStats.id}
                id={skaterStats.id}
                gamesPlayed={skaterStats.gamesPlayed}
                goals={skaterStats.goals}
                assists={skaterStats.assists}
                points={skaterStats.points}
                plusMinus={skaterStats.plusMinus}
              />
            </>
          )
          : (
            <>
              <GoalieStats
                key={goalieStats.id}
                id={goalieStats.id}
                gamesPlayed={goalieStats.gamesPlayed}
                wins={goalieStats.wins}
                losses={goalieStats.losses}
                GAA={goalieStats.GAA}
                savePercentage={goalieStats.savePercentage}
                shutouts={goalieStats.shutouts}
              />
            </>
          )
      }
    </Page>
  )
}
