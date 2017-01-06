import React from 'react'
import { IndexRedirect, Route, Router } from 'react-router'

import App from './components/App'
import DownloadsAndDocs from './components/DownloadsAndDocs'
import Explorer from './components/Explorer'
import history from './util/history'
import NotFound from './components/NotFound'
import Sample from './components/Sample'
import Sandbox from './components/Sandbox'

const routes = (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRedirect to='/explorer/ohio/murder' />
      <Route path='/downloads-and-docs' component={DownloadsAndDocs} />
      <Route path='/explorer/:place/:crime' component={Explorer} />
      <Route path='/sample' component={Sample} />
      <Route path='/sandbox' component={Sandbox} />
      <Route path='/*' component={NotFound} />
    </Route>
  </Router>
)

export default routes
