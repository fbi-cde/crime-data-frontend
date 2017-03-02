/* eslint no-undef: 0, no-console: 0 */

import sinon from 'sinon'

import {
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED,
} from '../../src/actions/constants'

import {
  fetchSummaries,
  fetchingSummary,
  receivedSummary,
} from '../../src/actions/summary'

import api from '../../src/util/api'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err);
}

const success = {
  results: [
    {
      place: 'montana',
      results: ['fake'],
    },
  ],
}

describe('summary action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('fetchingSummary()', () => {
    it('should return SUMMARY_FETCHING type', () => {
      const actual = fetchingSummary()
      expect(actual.type).toEqual(SUMMARY_FETCHING)
    })
  })

  describe('receivedSummary()', () => {
    const summaries = [1, 2, 3]
    const actual = receivedSummary(summaries)

    it('should return SUMMARY_RECEIVED type', () => {
      expect(actual.type).toEqual(SUMMARY_RECEIVED)
    })

    it('should return summaries equal to the results array', () => {
      expect(actual.summaries).toEqual(summaries)
    })
  })

  describe('fetchSummaries()', () => {
    it('should be a function', () => {
      expect(typeof fetchSummaries).toEqual('function')
    })

    it('should dispatch SUMMARY_FETCHING and SUMMARY_RECEIVED', done => {
      const dispatch = sandbox.spy()
      sandbox.stub(api, 'getSummaryRequests', () => [
        createPromise(success),
        createPromise(success),
      ])
      fetchSummaries({ place: 'montana' })(dispatch).then(() => {
        const first = dispatch.getCall(0)
        const second = dispatch.getCall(1)
        expect(first.args[0].type).toEqual(SUMMARY_FETCHING)
        expect(second.args[0].type).toEqual(SUMMARY_RECEIVED)
        done()
      })
    })

    it('should return properly formatted data', done => {
      const dispatch = sandbox.spy()
      sandbox.stub(api, 'getSummaryRequests', () => [
        createPromise(success),
        createPromise(success),
      ])
      fetchSummaries({ place: 'montana' })(dispatch).then(d => {
        expect(true).toEqual(false)
        done()
      })
    })
  })
})
