/*
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
*/

const cfenv = require('cfenv')

const env = cfenv.getAppEnv()
const credService = env.getService('crime-data-api-creds') || { credentials: {} }

exports.config = {
  app_name: ['crime-data-explorer'],
  license_key: credService.credentials.NEW_RELIC_EXPLORER_KEY,
  logging: {
    level: 'info',
  },
}
