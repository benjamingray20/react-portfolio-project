import React, { useEffect, useState } from 'react'
import Search from '../components/search'
import Title from '../components/title'
import Page from '../components/page'
import Player from '../components/player'
import { filterPlayers, retrievePlayers } from '../utils/players'

export default () => {
  const [playersList, setplayersList] = useState([])
  const [filteredPlayersList, setFilteredPlayersList] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function pullData() {
      const players = await retrievePlayers()

      setplayersList(players)
      setFilteredPlayersList(players)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterPlayers(playersList, searchTerm)

    setFilteredPlayersList(filtered)
  }, [searchTerm])

  return (
    <Page>
      <Title />
      <div className="subTitle">Please type in a players name and click for their stats</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredPlayersList.map(player => (
          <Player
            firstName={player.firstName}
            lastName={player.lastName}
            position={player.position}
          />
        ))
      }
    </Page>
  )
}
