/* eslint no-undef: 0 */

import axios from 'axios'
import sinon from 'sinon'

import * as http from '../../src/util/http'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err);
}

const success = {
  data: {
    pagination: {
      page: 1,
      pages: 5,
    },
    results: [{ type: 'fake' }],
  },
}

describe('http utility', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('get() should return data if successful', done => {
    sandbox.stub(axios, 'get', () => createPromise(success))
    http.get('API').then(data => {
      expect(data).toEqual(success.data)
      done()
    })
  })

  it(`getAll() should call get() ${success.data.pagination.pages} times`, done => {
    const expected = success.data.pagination.pages
    const spy = sandbox.stub(axios, 'get', () => createPromise(success))

    http.getAll('API').then(() => {
      expect(spy.callCount).toEqual(expected)
      done()
    })
  })
})
