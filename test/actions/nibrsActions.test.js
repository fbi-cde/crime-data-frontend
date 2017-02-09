/* eslint no-undef: 0, no-console: 0 */

import sinon from 'sinon'

import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from '../../src/actions/actionTypes'

import {
  fetchNibrsDimensions,
  fetchingNibrsDimensions,
  receivedNibrsDimensions,
} from '../../src/actions/nibrsActions'
import api from '../../src/util/api'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err);
}

const success = {
  results: [],
}

describe('nibrsAction', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('fetchingNibrsDimensions()', () => {
    it('should return INCIDENTS_FETCHING type', () => {
      const actual = fetchingNibrsDimensions()
      expect(actual.type).toEqual(INCIDENTS_FETCHING)
    })
  })

  describe('receivedNibrsDimensions()', () => {
    const action = { results: [1, 2, 3] }
    const actual = receivedNibrsDimensions(action)

    it('should return INCIDENTS_RECEIVED type', () => {
      expect(actual.type).toEqual(INCIDENTS_RECEIVED)
    })
    
    it('should return incidents equal to the results array', () => {
      expect(actual.data.results).toEqual(action.results)
    })
  })

  describe('fetchNibrsDimensions()', () => {
    it('should be a function', () => {
      expect(typeof fetchNibrsDimensions).toEqual('function')
    })

    it('should dispatch INCIDENTS_FETCHING and INCIDENTS_RECEIVED', done => {
      const dispatch = sandbox.spy()

      sandbox.stub(api, 'getNibrsRequests', () => [
        createPromise(success),
        createPromise(success),
      ])

      fetchNibrsDimensions({ place: 'montana' })(dispatch).then(() => {
        const first = dispatch.getCall(0)
        const second = dispatch.getCall(1)
        expect(first.args[0].type).toEqual(INCIDENTS_FETCHING)
        expect(second.args[0].type).toEqual(INCIDENTS_RECEIVED)
        done()
      }).catch(e => console.error(e))
    })
  })
})
