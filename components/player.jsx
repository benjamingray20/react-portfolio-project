import React from 'react'
import { NavLink } from 'react-router-dom'

export default ({ id, firstName, lastName }) => (
  <div key={id} className="players">
    <NavLink to={`/players/${lastName}`}>{`${firstName} ${lastName}`} </NavLink>
  </div>
)
