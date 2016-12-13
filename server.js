const basicAuth = require('basic-auth-connect')
const cfenv = require('cfenv')
const express = require('express')
const http = require('axios')

const app = express()

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }
const apiKey = credService.credentials.API_KEY || false
const username = credService.credentials.HTTP_BASIC_USERNAME
const password = credService.credentials.HTTP_BASIC_PASSWORD

if (process.env.NODE_ENV === 'production') {
  app.use(basicAuth(username, password))
}

app.use(express.static(__dirname))

const API = 'https://crime-data-api.fr.cloud.gov'

app.get('/api/*', (req, res) => {
  const route = req.params['0']
  const params = Object.assign({}, req.query, { api_key: apiKey })

  if (!apiKey) return res.status(401).end()

  return http.get(`${API}/${route}/`, { params }).then(r => {
    res.send(r.data)
  }).catch(e => {
    res.status(e.response.status).end()
  })
})

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
