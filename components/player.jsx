/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Players = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
  color: black;
  &:hover {
    color: aqua
  }
`
export default ({ id, firstName, lastName, position }) => (
  <Players key={id}>
    <NavLink to={`/players/${lastName}`}>{`${firstName} ${lastName} ${position}`} </NavLink>
  </Players>
)
