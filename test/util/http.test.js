/* eslint no-undef: 0 */

import axios from 'axios'
import sinon from 'sinon'

import http from '../../src/util/http'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err);
}

const success = {
  data: {
    pagination: {
      page: 1,
      pages: 2,
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

  // it('get() should return data if successful', done => {
  //   sandbox.stub(axios, 'get', () => createPromise(success))
  //   http.get('API').then(data => {
  //     expect(data).toEqual(success.data)
  //     done()
  //   })
  // })
  //
  // it('get() should log the error if unsuccessful', done => {
  //   const spy = sinon.stub(console, 'error', () => {})
  //
  //   sandbox.stub(axios, 'get', () => createPromise(undefined, true))
  //   http.get('API').then(() => {
  //     expect(spy.callCount).toEqual(1)
  //     done()
  //   })
  // })

  it(`getAll() should call get() ${success.data.pagination.pages} times`, done => {
    const expected = success.data.pagination.pages
    const spy = sandbox.spy(http, 'get')

    sandbox.stub(axios, 'get', () => createPromise(success))
    http.getAll('API').then(results => {
      console.log('callCount', spy.callCount)
      console.log('results', results)
      expect(spy.callCount).toEqual(expected)
      done()
    })
  })
})
