/* eslint no-undef: 0 */

import sinon from 'sinon'

import api, { formatError } from '../../src/util/api'
import * as http from '../../src/util/http'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err)
}

const params = {
  crime: 'homicide',
  place: 'california',
  placeType: 'state',
  placeId: 'ca',
  since: 2004,
  until: 2014,
}

const success = {
  pagination: {
    page: 1,
    pages: 5,
  },
  results: [{ type: 'fake' }],
}

describe('api utility', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('formatError()', () => {
    it('should reshape the fetch error object', () => {
      const fakeError = {
        response: { status: 400 },
        message: 'fake error',
        config: { url: 'fake/url' },
      }
      const actual = formatError(fakeError)
      expect(actual.code).toEqual(400)
      expect(actual.message).toEqual('fake error')
      expect(actual.url).toEqual('fake/url')
    })
  })

  describe('fetchNibrs()', () => {
    it('should call the /offenders/count/states/:postal_abbr/:dim/offenses endpoint', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      const args = { ...params, type: 'offender', dim: 'sexCode' }
      api.fetchNibrs(args).then(() => {
        const spyArgs = spy.args[0]
        const expectedUrl =
          '/api-proxy/offenders/count/states/ca/sex_code/offenses'
        expect(spyArgs[0]).toEqual(expectedUrl)
        expect(spyArgs[1].explorer_offense).toEqual(params.crime)
        done()
      })
    })

    it('should return a data structure with a key and data', done => {
      sandbox.stub(http, 'get', () => createPromise(success))
      const args = { ...params, type: 'offender', dim: 'sexCode' }
      api.fetchNibrs(args).then(d => {
        expect(d.key).toEqual('offenderSexCode')
        expect(d.data).toEqual(success.results)
        done()
      })
    })
  })

  describe('getNibrsRequests()', () => {
    it('should call getNibrs 11 times', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      Promise.all(api.getNibrsRequests(params)).then(() => {
        expect(spy.callCount).toEqual(11)
        done()
      })
    })
  })

  describe('fetching summary data', () => {
    it('should request /estimates/national for national', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAggregates().then(() => {
        const url0 = spy.args[0][0]
        const url1 = spy.args[1][0]
        expect(url0.includes('/estimates/national')).toEqual(true)
        expect(url1.includes('/arson/national')).toEqual(true)
        done()
      })
    })

    it('should request /estimates/states/:state if place is a state', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAggregates('california', 'state', 'ca').then(() => {
        const url0 = spy.args[0][0]
        const url1 = spy.args[1][0]
        expect(url0.includes('/estimates/states/ca')).toEqual(true)
        expect(url1.includes('/arson/states/ca')).toEqual(true)
        done()
      })
    })

    it('should request */agencies/count/* if place is an agency', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAgencyAggregates('NJ123', 'robbery').then(() => {
        const url = spy.args[0][0]
        const pathPartial = 'api/agencies/NJ123'
        expect(url.includes(pathPartial)).toEqual(true)
        done()
      })
    })

    it('should return a data structure with key and results', done => {
      sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAggregates('california').then(data => {
        expect(data.key).toEqual('california')
        expect(data.results).toEqual(success.results)
        done()
      })
    })
  })
})
