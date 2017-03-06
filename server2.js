/* eslint global-require: 0 */

import 'babel-polyfill'

const production = (process.env.NODE_ENV === 'production')
if (production) require('newrelic')

const cfenv = require('cfenv')
const express = require('express')
const http = require('axios')

const app = express()

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }
const apiKey = credService.credentials.API_KEY || process.env.API_KEY || false
const API = 'https://crime-data-api.fr.cloud.gov'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import routes from './src/routes'
import store from './src/store'

app.get('/status', (req, res) => res.send('OK'))

// app.use(express.static(__dirname))

app.use(express.static('build'))

app.get('*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.

    console.log(props)

    const appHtml = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    )

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href='/app.css'>
    <div id='app'>${appHtml}</div>
   `
}

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

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
