/* eslint no-undef: 0 */

import sinon from 'sinon'

import api from '../../src/util/api'
import * as http from '../../src/util/http'
import { nationalKey } from '../../src/util/usa'


const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err);
}

const params = {
  crime: 'homicide',
  place: 'california',
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
        const expectedUrl = '/api/offenders/count/states/CA/sex_code/offenses'
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

  describe('getSummary()', () => {
    it('should request /estimates/national for national', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.getSummary({ place: nationalKey }).then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/estimates/national')).toEqual(true)
        done()
      })
    })

    it('should request /estimates/states/:state if place is a state', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.getSummary({ place: 'california' }).then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/estimates/states/CA')).toEqual(true)
        done()
      })
    })

    it('should return a data structure with the place and the results', () => {
      sandbox.stub(http, 'get', () => createPromise(success))
      api.getSummary(params).then(data => {
        expect(data.place).toEqual(summaryParms.place)
        expect(data.results).toEqual(success.results)
        done()
      })
    })
  })

  describe('getSummaryRequests()', () => {
    it('should call getSummary twice', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      Promise.all(api.getSummaryRequests(params)).then(() => {
        expect(spy.callCount).toEqual(2)
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
