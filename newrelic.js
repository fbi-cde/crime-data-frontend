/*
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
*/
const cfenv = require('cfenv')

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-creds') || {
  credentials: {},
}

const isProd = process.env.NODE_ENV === 'production'
const key = credService.credentials.NEW_RELIC_API_KEY

exports.config = {
  app_name: ['crime-data-frontend'],
  license_key: key,
  agent_enabled: isProd,
  logging: {
    level: 'info',
  },
}
