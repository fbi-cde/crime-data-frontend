const basicAuth = require('basic-auth-connect')
const cfenv = require('cfenv')
const express = require('express')

const app = express()
const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }
const password = credService.credentials["HTTP_BASIC_PASSWORD"]
const username = credService.credentials["HTTP_BASIC_USERNAME"]

if (process.env.NODE_ENV === 'prod') {
  app.use(basicAuth(username, password))
}

app.use(express.static(__dirname))

app.listen(env.port, () => {
  console.log(`Listening on ${env.port}`)
})
