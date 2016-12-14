import React from 'react'
import { hashHistory, IndexRoute, Router, Route } from 'react-router'

import App from './components/App'
import Explorer from './components/Explorer'
import NotFound from './components/NotFound'
import Sample from './components/Sample'
import Sandbox from './components/Sandbox'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Sandbox} />
      <Route path='/explorer/:state/:crime' component={Explorer} />
      <Route path='/sample' component={Sample} />
      <Route path='/sandbox' component={Sandbox} />
      <Route path='/*' component={NotFound} />
    </Route>
  </Router>
)

export default routes
