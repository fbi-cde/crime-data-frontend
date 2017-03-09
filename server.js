/* eslint-disable comma-dangle, global-require, import/first, no-console, padded-blocks */

import 'babel-polyfill'

import path from 'path'

import cfenv from 'cfenv'
import express from 'express'
import http from 'axios'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

if (process.env.NODE_ENV === 'production') {
  require('newrelic')
}

import configureStore from './src/store'
import history from './src/util/history'
import renderHtml from './src/html'
import routes from './src/routes'

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }
const apiKey = credService.credentials.API_KEY || process.env.API_KEY || false
const API = 'https://crime-data-api.fr.cloud.gov'

const app = express()

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
  const store = configureStore()

  match({ history, routes, location: req.url }, (err, redirect, props) => {
    if (err) {

      res.status(500).send('Internal Server Error')

    } else if (redirect) {

      const { pathname, search } = redirect
      res.redirect(`${pathname}${search}`)

    } else if (props) {

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      )
      const state = store.getState()
      res.send(renderHtml(html, state))

    }
  })
})

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
