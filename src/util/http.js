import http from 'axios'
import flatten from 'lodash.flatten'
import range from 'lodash.range'

const get = (url, params = {}) => {
  console.log('get');
  return http.get(url, { params })
    .then(f => f.data)
    .catch(err => console.error(err))
}

const getAll = (url, params = {}) => {
  console.log('getall')
  const all = get(url, params).then(first => {
    const pageCount = range(1, first.pagination.pages + 1)
    const pages = pageCount.map(page => {
      const pageParams = Object.assign({}, params, { page })
      return get(url, pageParams).then(r => r.results)
    })

    return Promise.all(pages).then(results => {
      console.log('results', results)
      return [first.results, ...results]
    })
  }).then(pages => flatten(pages))

  return all
}

export default { get, getAll }
