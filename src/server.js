/* eslint-disable global-require, no-console, padded-blocks */

import 'babel-polyfill'
import 'newrelic'

import path from 'path'
import url from 'url'

import http from 'axios'
import bodyParser from 'body-parser'
import express from 'express'
import gzipStatic from 'connect-gzip-static'
import helmet from 'helmet'
import React from 'react'
import ReactHelmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import uuid from 'uuid/v4'

import packageJson from '../package.json'
import renderHtml from './html'
import routes from './routes'
import configureStore from './store'
import { fetchAgency } from './actions/agencies'
import { updateFilters } from './actions/filters'
import { fetchUcrRegion } from './actions/region'
import { fetchUcrState } from './actions/states'

import createEnv from './util/env'
import { createIssue } from './util/github'
import history from './util/history'

const isProd = process.env.NODE_ENV === 'production'

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
  agencies: { data: {} },
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
app.use((req, res, next) => {
  /* eslint-disable no-param-reassign */
  res.locals.nonce = uuid()
  /* eslint-enable no-param-reassign */
  next()
})
app.use(gzipStatic(__dirname))
app.use(gzipStatic(publicDirPath))
app.use(bodyParser.json())

const defaultSrc = [
  "'self'", // serve any assets from this server
  url.parse(API).hostname, // enable any requests to the API server
  'www.google-analytics.com',
  'dap.digitalgov.gov',
]
app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc,
      scriptSrc: [
        ...defaultSrc,
        "'unsafe-eval'", // unfortunately, required for DAP right now
        (req, res) => `'nonce-${res.locals.nonce}'`,
      ],
      styleSrc: [...defaultSrc, "'unsafe-inline'"],
    },
  }),
)

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
      store.dispatch(fetchUcrRegion())
      store.dispatch(fetchUcrState())
      store.dispatch(updateFilters({ ...props.router.params }))
      store.dispatch(fetchAgency({ ...props.router.params }))


      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>,
      )
      const head = ReactHelmet.rewind()
      res.send(renderHtml(html, head, store.getState(), res.locals.nonce))
    }
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
