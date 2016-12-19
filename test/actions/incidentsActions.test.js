/* eslint no-undef: 0, no-console: 0 */

import sinon from 'sinon'

import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from '../../src/actions/actionTypes'

import {
  fetchIncidents,
  fetchingIncidents,
  receivedIncidents,
} from '../../src/actions/incidentsActions'
import api from '../../src/util/api'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err);
}

const success = {
  results: [],
}

describe('incidentsAction', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('fetchingIncidents()', () => {
    it('should return INCIDENTS_FETCHING type', () => {
      const actual = fetchingIncidents()
      expect(actual.type).toEqual(INCIDENTS_FETCHING)
    })
  })

  describe('receivedIncidents()', () => {
    const action = { results: [1, 2, 3] }

    it('should return INCIDENTS_RECEIVED type', () => {
      const actual = receivedIncidents(action)
      expect(actual.type).toEqual(INCIDENTS_RECEIVED)
    })

    const actual = receivedIncidents(action)
    it('should return incidents equal to the results array', () => {
      expect(actual.incidents).toEqual(action.results)
    })
  })

  describe.only('fetchIncidents()', () => {
    it('should be a function', () => {
      expect(typeof fetchIncidents).toEqual('function')
    })

    it('should dispatch INCIDENTS_FETCHING and INCIDENTS_RECEIVED', done => {
      const dispatch = sinon.spy()
      sinon.stub(api, 'getIncidents', () => createPromise(success))

      fetchIncidents()(dispatch).then(() => {
        const first = dispatch.getCall(0)
        const second = dispatch.getCall(1)
        expect(first.args[0].type).toEqual(INCIDENTS_FETCHING)
        expect(second.args[0].type).toEqual(INCIDENTS_RECEIVED)
        done()
      }).catch(e => console.error(e)) // here to error promise rejection
    })
  })
})
