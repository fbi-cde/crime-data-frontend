/* eslint no-undef: 0 */

import sinon from 'sinon'

import api from '../../src/util/api'
import * as http from '../../src/util/http'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err)
}

const params = {
  crime: 'homicide',
  place: 'california',
  placeType: 'state',
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

  describe('getNibrs()', () => {
    it('should call the /offenders/count/states/:postal_abbr/:dim/offenses endpoint', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      const args = { ...params, type: 'offender', dim: 'sexCode' }
      api.getNibrs(args).then(() => {
        const spyArgs = spy.args[0]
        const expectedUrl =
          '/api-proxy/offenders/count/states/CA/sex_code/offenses'
        expect(spyArgs[0]).toEqual(expectedUrl)
        expect(spyArgs[1].explorer_offense).toEqual(params.crime)
        done()
      })
    })

    it('should return a data structure with a key and data', done => {
      sandbox.stub(http, 'get', () => createPromise(success))
      const args = { ...params, type: 'offender', dim: 'sexCode' }
      api.getNibrs(args).then(d => {
        expect(d.key).toEqual('offenderSexCode')
        expect(d.data).toEqual(success.results)
        done()
      })
    })
  })

  describe('getNibrsRequests()', () => {
    it('should call getNibrs 8 times', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      Promise.all(api.getNibrsRequests(params)).then(() => {
        expect(spy.callCount).toEqual(8)
        done()
      })
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
      api.fetchAggregates('california').then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/estimates/states/CA')).toEqual(true)
        done()
      })
    })

    it('should request */agencies/count/* if place is an agency', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.fetchAgencyAggregates('NJ123', 'NJ').then(() => {
        const url = spy.args[0].pop()
        const pathPartial = '/agencies/count/states/offenses/NJ/NJ123'
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
      api.getUcrParticipation('california').then(() => {
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
