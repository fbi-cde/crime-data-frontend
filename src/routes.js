import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import App from './components/App'
import NotFound from './components/NotFound'
import Sample from './components/Sample'
import Sandbox from './components/Sandbox'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='/sample' component={Sample} />
      <Route path='/sandbox' component={Sandbox} />
      <Route path='/*' component={NotFound} />
    </Route>
  </Router>
)

export default routes
