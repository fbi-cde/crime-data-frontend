/* eslint-disable global-require, no-console, padded-blocks */

import 'babel-polyfill'

import http from 'axios'
import cfenv from 'cfenv'
import express from 'express'
import gzipStatic from 'connect-gzip-static'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import packageJson from '../package.json'
import renderHtml from './html'
import routes from './routes'
import configureStore from './store'
import { updateFilters } from './actions/filters'
import history from './util/history'

if (process.env.NODE_ENV === 'production') require('newrelic')


const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }
const apiKey = credService.credentials.API_KEY || process.env.API_KEY || false
const API = process.env.CDE_API

const app = express()

app.use(gzipStatic(__dirname))
app.use(gzipStatic(path.join(__dirname, '..', 'public')))

app.get('/status', (req, res) => res.send(`OK v${packageJson.version}`))

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

      const action = updateFilters({ ...props.router.params })
      store.dispatch(action)
      res.send(renderHtml(html, store.getState()))
    }
  })
})

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
