/* eslint no-undef: 0 */

import sinon from 'sinon'

import * as http from '../../src/util/http'
import api from '../../src/util/api'


const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err);
}

const params = {
  crime: 'homicide',
  place: 'california',
  timeFrom: 2004,
  timeTo: 2014,
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
    it('should call the /offenders/count/states/:id/:dim/offenses endpoint', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      const args = { ...params, type: 'offender', dim: 'sexCode' }
      api.getNibrs(args).then(() => {
        const spyArgs = spy.args[0]
        const expectedUrl = '/api/offenders/count/states/6/sex_code/offenses'
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
    it('should call the /incidents/count endpoint', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.getSummary(params).then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/incidents/count')).toEqual(true)
        expect(url.includes('?explorer_offense=homicide')).toEqual(true)
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
    it('should call the /geo/states/:id/participation endpoint', done => {
      const spy = sandbox.stub(http, 'get', () => createPromise(success))
      api.getUcrParticipation('california').then(() => {
        const url = spy.args[0].pop()
        expect(url.includes('/geo/states')).toEqual(true)
        expect(url.includes('/participation')).toEqual(true)
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
