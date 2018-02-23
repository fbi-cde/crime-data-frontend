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


  describe('fetching summary data', () => {
    it('should request /estimates/national for national', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAggregates().then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/estimates/national')).toEqual(true)
        done()
      })
    })

    it('should request /estimates/states/:state if place is a state', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAggregates('california', 'state', 'ca').then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/estimates/states/ca')).toEqual(true)
        done()
      })
    })

    it('should request */agencies/count/* if place is an agency', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAgencyAggregates('NJ123', 'robbery').then(() => {
        const url = spy.args[0][0]
        const pathPartial = '/agencies/count/NJ123'
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

  describe('getUcrParticipation()', () => {
    it('should call the /participation/states/:id endpoint', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.getUcrParticipation('california', 'ca', 'state').then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/participation/states')).toEqual(true)
        done()
      })
    })

    it('should return a data structure with the place and the results', done => {
      sandbox.stub(http, 'get', () => createPromise(success))
      api.getUcrParticipation('california').then(data => {
        expect(data.place).toEqual('california')
        expect(data.results).toEqual(success.results)
        done()
      })
    })
  })
})
