/* eslint-disable comma-dangle, global-require, import/first, no-console */

if (process.env.NODE_ENV === 'production') require('newrelic')

import 'babel-polyfill'
import fs from 'fs'
import path from 'path'

import cfenv from 'cfenv'
import express from 'express'
import http from 'axios'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import thunk from 'redux-thunk'

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
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/status', (req, res) => res.send(`OK ${__dirname}`))

app.get('/api/*', (req, res) => {
  const route = `${API}/${req.params['0']}`.replace(/\/$/g, '')
  const params = Object.assign({}, req.query, { api_key: apiKey })

  if (!apiKey) return res.status(401).end()

  return http.get(route, { params }).then(r => {
    res.set(r.headers)
    res.send(r.data)
  }).catch(e => {
    res.status(e.response.status).end()
  })
})

app.get('/*', (req, res) => {
  match({ history, routes, location: req.url }, (err, redirect, props) => {
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
