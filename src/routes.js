import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import NotFound from './components/NotFound'
import Sample from './components/Sample'
import Sandbox from './components/Sandbox'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Sandbox} />
    <Route path='/sample' component={Sample} />
    <Route path='*' component={NotFound} />
  </Router>
)

export default routes
