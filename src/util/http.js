import http from 'axios'
import flatten from 'lodash.flatten'
import range from 'lodash.range'

import storage from './localStorage'

const createUrlQueryString = obj => {
  const keys = Object.keys(obj).sort((a, b) => b < a)
  return (keys.length > 0) ? keys.map(k => `${k}=${obj[k]}`).join('&') : ''
}

const createUrlKey = (url, p = {}) => `${url}?${createUrlQueryString(p)}`

const get = (url, params = {}) => {
  const key = createUrlKey(url, params)
  return storage.getItem(key).then(item => {
    if (item !== null) return item

    return http.get(url, { params })
      .then(f => f.data).then(data => {
        storage.setItem(key, data)
        return data
      })
  })
}

const getAll = (url, params = {}) => {
  const all = get(url, params).then(first => {
    if (first.pagination.pages === 1) return first.results

    const pageCount = range(2, first.pagination.pages + 1)
    const pages = pageCount.map(page => {
      const pageParams = Object.assign({}, params, { page })
      return get(page, pageParams).then(r => r.results)
    })

    return Promise.all(pages).then(results => [first.results, ...results])
  }).then(pages => flatten(pages))

  return all
}

export { get, getAll }
