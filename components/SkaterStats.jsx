/* eslint-disable object-curly-newline */
import React from 'react'

export default ({ gamesPlayed, goals, assists, points, plusMinus }) => (
  <table className="stats">
    <tr>
      <th>Games Played</th>
      <th>Goals</th>
      <th>Assists</th>
      <th>Points</th>
      <th>Plus/Minus</th>
    </tr>
    <tr>
      <td>{`${gamesPlayed}`}</td>
      <td>{`${goals}`}</td>
      <td>{`${assists}`}</td>
      <td>{`${points}`}</td>
      <td>{`${plusMinus}`}</td>
    </tr>
  </table>
)
