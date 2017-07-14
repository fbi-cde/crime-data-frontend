/* eslint-disable global-require, no-console, padded-blocks */

import 'babel-polyfill'

import http from 'axios'
import bodyParser from 'body-parser'
import express from 'express'
import gzipStatic from 'connect-gzip-static'
import path from 'path'
import React from 'react'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import agencyNames from '../public/data/agencies-names-by-state.json'
import packageJson from '../package.json'
import renderHtml from './html'
import routes from './routes'
import configureStore from './store'
import { receivedAgency } from './actions/agencies'
import { updateFilters } from './actions/filters'
import createEnv from './util/env'
import { createIssue } from './util/github'
import history from './util/history'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) require('newrelic')

const ENV = createEnv()

const {
  CDE_API: API,
  API_KEY: apiKey,
  GITHUB_ISSUE_REPO_OWNER: repoOwner,
  GITHUB_ISSUE_REPO_NAME: repoName,
  GITHUB_ISSUE_BOT_TOKEN: repoToken,
  PORT,
} = ENV

const initState = {
  agencies: { data: {}, loading: true },
  participation: { data: {}, loading: true },
  summaries: { data: {}, loading: true },
}

const acceptHostname = hostname => {
  if (!isProd) return true

  const prodHost = /crime-data-explorer.*\.fr.cloud.gov$/
  return hostname.match(prodHost)
}

const app = express()

const publicDirPath = path.join(__dirname, '..', 'public')
app.use(gzipStatic(__dirname))
app.use(gzipStatic(publicDirPath))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.sendfile('/swagger/index.html', { root: publicDirPath })
})

app.get('/api-proxy/*', (req, res) => {
  const route = `${API}/${req.params['0']}`.replace(/\/$/g, '')
  const params = Object.assign({}, req.query, { api_key: apiKey })

  if (!apiKey) return res.status(401).end()

  return http
    .get(route, { params })
    .then(r => {
      res.set(r.headers)
      res.send(r.data)
    })
    .catch(e => {
      res.status(e.response.status).end()
    })
})

app.post('/feedback', (req, res) => {
  const { body, title } = req.body
  const allEnvs = repoOwner && repoName && repoToken

  if (!allEnvs || !acceptHostname(req.hostname)) return res.status(401).end()

  return createIssue({
    body,
    owner: repoOwner,
    repo: repoName,
    title,
    token: repoToken,
  })
    .then(issue => res.send(issue.data))
    .catch(e => res.status(e.response.status).end())
})

app.get('/status', (req, res) => res.send(`OK v${packageJson.version}`))

app.get('/*', (req, res) => {
  match({ history, routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else if (redirect) {
      const { pathname, search } = redirect
      res.redirect(`${pathname}${search}`)
    } else if (props) {
      const store = configureStore(initState)
      const { place, placeType } = props.router.params
      store.dispatch(updateFilters({ ...props.router.params }))

      if (placeType === 'agency') {
        store.dispatch(
          receivedAgency({
            ori: place,
            agency_name: agencyNames[place],
          }),
        )
      }

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>,
      )
      const head = Helmet.rewind()

      res.send(renderHtml(html, head, store.getState()))
    }
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
