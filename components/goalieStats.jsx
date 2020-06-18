/* eslint-disable object-curly-newline */
import React from 'react'

export default ({ gamesPlayed, wins, losses, GAA, savePercentage, shutouts }) => (
  <table className="stats">
    <tr>
      <th>Games Played</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>GAA</th>
      <th>Save Percentage</th>
      <th>Shutouts</th>
    </tr>
    <tr>
      <td>{`${gamesPlayed}`}</td>
      <td>{`${wins}`}</td>
      <td>{`${losses}`}</td>
      <td>{`${GAA}`}</td>
      <td>{`${savePercentage}`}</td>
      <td>{`${shutouts}`}</td>
    </tr>
  </table>
)
