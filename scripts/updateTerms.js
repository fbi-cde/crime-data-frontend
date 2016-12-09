/* eslint arrow-body-style: 0, newline-per-chained-call: 0, no-console: 0 */

/* pull YAML file from 18f/crime-data-api/terms.yml and generate
   a sorted JSON file of terms and definitions for the gloassary
   component
*/

const fs = require('fs')
const path = require('path')

const http = require('axios')
const yaml = require('js-yaml')

const dest = path.join(__dirname, '../data/terms.json')
const newest = 'https://raw.githubusercontent.com/18F/crime-data-api/master/terms.yml'

http.get(newest).then(r => {
  if (r.status !== 200) throw new Error(r.statusText)
  return yaml.safeLoad(r.data, 'utf8')
}).then(j => {
  const terms = Object.keys(j).sort((a, b) => ((a < b) ? -1 : 1))
  return terms.map(t => ({ term: t, definition: j[t] }))
}).then(t => {
  fs.writeFileSync(dest, JSON.stringify(t, null, 2))
}).catch(e => (
  console.error('err', e)
))
