import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'

import About from './components/About'
import App from './containers/App'
import DownloadsAndDocs from './components/DownloadsAndDocs'
import Explorer from './components/Explorer'
import Home from './containers/Home'
import NotFound from './components/NotFound'
import history from './util/history'

const scrollToTop = () => window.scroll(0, 0)

const routes = (
  <Router history={history} onUpdate={scrollToTop}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/downloads-and-docs" component={DownloadsAndDocs} />
      <Route path="/explorer/:crime" component={Explorer} />
      <Route path="/explorer/:placeType/:place/:crime" component={Explorer} />
      <Route path="/about" component={About} />
      <Route path="/*" component={NotFound} />
    </Route>
  </Router>
)

export default routes
