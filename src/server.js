/* eslint-disable global-require, no-console, padded-blocks */

import 'babel-polyfill'

import http from 'axios'
import basicAuth from 'basic-auth-connect'
import bodyParser from 'body-parser'
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
import { createIssue } from './util/github'
import history from './util/history'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) require('newrelic')

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || {
  credentials: {},
}

const {
  API_KEY,
  HTTP_BASIC_USERNAME,
  HTTP_BASIC_PASSWORD,
} = credService.credentials
const apiKey = API_KEY || process.env.API_KEY || false
const API = process.env.CDE_API
const initState = { ucr: { loading: true }, summaries: { loading: true } }

const acceptHostname = hostname => {
  if (!isProd) return true

  const prodHost = /crime-data-explorer.*\.fr.cloud.gov$/
  return hostname.match(prodHost)
}

const app = express()

if (isProd) app.use(basicAuth(HTTP_BASIC_USERNAME, HTTP_BASIC_PASSWORD))

app.use(gzipStatic(__dirname))
app.use(gzipStatic(path.join(__dirname, '..', 'public')))
app.use(bodyParser.json())

app.get('/status', (req, res) => res.send(`OK v${packageJson.version}`))

app.get('/api/*', (req, res) => {
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
  const owner = process.env.GITHUB_ISSUE_REPO_OWNER
  const repo = process.env.GITHUB_ISSUE_REPO_NAME
  const token = process.env.GITHUB_ISSUE_BOT_TOKEN
  const allEnvs = owner && repo && token

  if (!allEnvs || !acceptHostname(req.hostname)) return res.status(401).end()

  return createIssue({ body, owner, repo, title, token })
    .then(issue => res.send(issue.data))
    .catch(e => res.status(e.response.status).end())
})

app.get('/*', (req, res) => {
  match({ history, routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else if (redirect) {
      const { pathname, search } = redirect
      res.redirect(`${pathname}${search}`)
    } else if (props) {
      const store = configureStore(initState)
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>,
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
