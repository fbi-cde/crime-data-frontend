/* eslint no-undef: 0 */

import axios from 'axios'
import sinon from 'sinon'

import * as http from '../../src/util/http'
import storage from '../../src/util/localStorage'


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

  describe('get()', () => {
    it('should return data if successful', done => {
      sandbox.stub(axios, 'get', () => createPromise(success))
      http.get('API').then(data => {
        expect(data).toEqual(success.data)
        done()
      })
    })

    it('should first check localStorage and make a request if it isn\'t there', done => {
      const httpSpy = sandbox.stub(axios, 'get', () => createPromise(success))
      const storageGetSpy = sandbox.stub(storage, 'getItem', () => createPromise(null))
      const storageSetSpy = sandbox.stub(storage, 'setItem', () => createPromise(true))
      http.get('API').then(data => {
        expect(storageGetSpy.callCount).toEqual(1)
        expect(httpSpy.callCount).toEqual(1)
        expect(storageSetSpy.callCount).toEqual(1)
        expect(data).toEqual(success.data)
        done()
      })
    })

    it('should first check localStorage and return data if it is found', done => {
      const httpSpy = sandbox.stub(axios, 'get', () => createPromise(success))
      const storageGetSpy = sandbox.stub(storage, 'getItem', () => createPromise(success.data))
      const storageSetSpy = sandbox.stub(storage, 'setItem', () => createPromise(true))
      http.get('API').then(data => {
        expect(storageGetSpy.callCount).toEqual(1)
        expect(httpSpy.callCount).toEqual(0)
        expect(storageSetSpy.callCount).toEqual(0)
        expect(data).toEqual(success.data)
        done()
      })
    })
  })

  describe('getAll()', () => {
    it(`should call get() ${success.data.pagination.pages} times`, done => {
      const expected = success.data.pagination.pages
      const spy = sandbox.stub(axios, 'get', () => createPromise(success))

      http.getAll('API').then(() => {
        expect(spy.callCount).toEqual(expected)
        done()
      })
    })

    it('should flatten all the results into a single array', done => {
      const expected = [0, 1, 2, 3, 4].map(() => success.data.results[0])
      sandbox.stub(axios, 'get', () => createPromise(success))

      http.getAll('API').then(data => {
        expect(data).toEqual(expected)
        done()
      })
    })
  })
})
