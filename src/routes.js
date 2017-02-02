import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import App from './components/App'
import DownloadsAndDocs from './components/DownloadsAndDocs'
import Explorer from './components/Explorer'
import history from './util/history'
import Home from './components/Home'
import NotFound from './components/NotFound'

const routes = (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/downloads-and-docs' component={DownloadsAndDocs} />
      <Route path='/explorer/:place/:crime' component={Explorer} />
      <Route path='/*' component={NotFound} />
    </Route>
  </Router>
)

export default routes
