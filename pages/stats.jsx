import React, { useEffect, useState } from 'react'
import Page from '../components/page'
import Title from '../components/title'
import { retrievePlayersStats } from '../utils/stats'
import palyerDetails from '../components/palyerDetails'

export default ({ location }) => {
  const [playersLastName, setPlayersLastName] = useState('')
  const [player, setPlayer] = useState({})
  const [statsList, setStatsList] = useState({})

  useEffect(() => {
    async function pullData() {
      const { lastName, details, stats } = await retrievePlayersStats(location)
      setPlayersLastName(lastName)
      setPlayer(details)
      setStatsList(stats)
    }
    pullData()
  }, [])
  return (
    <Page>
      <Title />
      {
        playersLastName
          ? (
            <palyerDetails firstName={player.firstName} lastName={player.lastName} position={player.position} />
          )
          : (<div>Not Found</div>)
      }
    </Page>
  )
}
