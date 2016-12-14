/* eslint no-console: 0 */

import http from 'axios'
import flatten from 'lodash.flatten'
import range from 'lodash.range'

const API = '/api'
const ENDPOINTS = {
  incidents: `${API}/incidents`,
}

const get = (url, params = {}) => (
  http.get(url, { params })
    .then(f => f.data)
    .catch(err => console.error(err))
)

const getAll = (url, params = {}) => {
  const all = get(url, params).then(first => {
    const pageCount = range(2, +first.pagination.pages)
    const pages = pageCount.map(page => {
      const pageParams = Object.assign({}, params, { page })
      return get(url, pageParams).then(r => r.results)
    })

    return Promise.all(pages).then(results => [first.results, ...results])
  }).then(pages => flatten(pages))

  return all
}

const getAllIncidents = params => getAll(ENDPOINTS.incidents, params)
const getIncidents = params => get(ENDPOINTS.incidents, params)

export default { getAllIncidents, getIncidents }
