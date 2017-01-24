import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import App from './components/App'
import DownloadsAndDocs from './components/DownloadsAndDocs'
import Explorer from './components/Explorer'
import history from './util/history'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Sample from './components/Sample'

const routes = (
  <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/downloads-and-docs' component={DownloadsAndDocs} />
      <Route path='/explorer/:place/:crime' component={Explorer} />
      <Route path='/sample' component={Sample} />
      <Route path='/*' component={NotFound} />
    </Route>
  </Router>
)

export default routes
