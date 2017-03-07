/* eslint global-require: 0, import/first: 0, no-console: 0 */

const production = (process.env.NODE_ENV === 'production')

import 'babel-polyfill'

if (production) require('newrelic')

import fs from 'fs'

import cfenv from 'cfenv'
import express from 'express'
import http from 'axios'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import thunk from 'redux-thunk'

import { updateApp } from './src/actions/composite'
import history from './src/util/history'
import reducers from './src/reducers'
import routes from './src/routes'

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }
const apiKey = credService.credentials.API_KEY || process.env.API_KEY || false
const API = 'https://crime-data-api.fr.cloud.gov'

const app = express()
const appShell = fs.readFileSync('index.html').toString()

const store = createStore(reducers, applyMiddleware(thunk))

app.use(express.static(__dirname))

app.get('/status', (req, res) => res.send('OK'))

app.get('/api/*', (req, res) => {
  const route = `${API}/${req.params['0']}`.replace(/\/$/g, '')
  const params = Object.assign({}, req.query, { api_key: apiKey })

  if (!apiKey) return res.status(401).end()

  return http.get(route, { params }).then(r => {
    res.set(r.headers)
    res.send(r.data)
  }).catch(e => {
    // console.error(e)
    res.status(e.response.status).end()
  })
})

app.get('/*', (req, res) => {
  // match the routes to the url
  match({ history, routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.

    const filters = {
      ...props.location.query,
      ...props.params,
    }
    const action = updateApp(filters)
    console.log('filters', filters)
    console.log('action', action)

    const appHtml = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    )
    const page = appShell.replace('<div id=\'app\'></div>', `<div id='app'>${appHtml}</div>`)
    res.send(page)
  })
})

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
