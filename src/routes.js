import React from 'react'
import { hashHistory, IndexRedirect, Route, Router } from 'react-router'

import App from './components/App'
import DownloadsAndDocs from './components/DownloadsAndDocs'
import Explorer from './components/Explorer'
import NotFound from './components/NotFound'
import Sample from './components/Sample'
import Sandbox from './components/Sandbox'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='/explorer/ohio/murder' />
      <Route path='/downloads-and-docs' component={DownloadsAndDocs} />
      <Route path='/explorer/:state/:crime' component={Explorer} />
      <Route path='/sample' component={Sample} />
      <Route path='/sandbox' component={Sandbox} />
      <Route path='/*' component={NotFound} />
    </Route>
  </Router>
)

export default routes
