import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PlayersPage from './pages/players'
import StatsPage from './pages/stats'

render(
  <BrowserRouter>
    <Switch>
      <Route path="/players" component={StatsPage} />
      <Route path="*" component={PlayersPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
