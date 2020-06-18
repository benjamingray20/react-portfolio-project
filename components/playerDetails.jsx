/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import styled from 'styled-components'

const Players = styled.div`
 font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`

export default ({ id, firstName, lastName, position }) => (
  <Players key={id}>
    {`${firstName} ${lastName} - ${position}`}
  </Players>
)
