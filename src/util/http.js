import http from 'axios'
import flatten from 'lodash.flatten'
import range from 'lodash.range'

const get = (url, params = {}) => http.get(url, { params }).then(f => f.data)

const getAll = (url, params = {}) => {
  const all = get(url, params)
    .then(first => {
      if (first.pagination.pages === 1) return first.results

      const pageCount = range(2, first.pagination.pages + 1)
      const pages = pageCount.map(page => {
        const pageParams = Object.assign({}, params, { page })
        return get(page, pageParams).then(r => r.results)
      })

      return Promise.all(pages).then(results => [first.results, ...results])
    })
    .then(pages => flatten(pages))

  return all
}

export { get, getAll }
