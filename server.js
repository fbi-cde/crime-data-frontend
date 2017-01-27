/* eslint global-require: 0 */

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

app.get('/status', (req, res) => res.send('OK'))

app.use(express.static(__dirname))

app.get('/api/*', (req, res) => {
  const route = `${API}/${req.params['0']}`.replace(/\/$/g, '')
  const params = Object.assign({}, req.query, { api_key: apiKey })

  if (!apiKey) return res.status(401).end()

  return http.get(route, { params }).then(r => {
    res.send(r.data)
  }).catch(e => {
    res.status(e.response.status).end()
  })
})

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
