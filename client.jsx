import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PlayersPage from './pages/players'
import StatsPage from './pages/stats'
import ErrorPage from './pages/error'

render(
  <BrowserRouter>
    <Switch>
      <Route path="/players" component={StatsPage} />
      <Route exact path="/" component={PlayersPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
