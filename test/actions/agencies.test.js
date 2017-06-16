/* eslint no-undef: 0, no-console: 0 */

import sinon from 'sinon'

import {
  AGENCY_FAILED,
  AGENCY_FETCHING,
  AGENCY_RECEIVED,
} from '../../src/actions/constants'
import {
  failedAgency,
  fetchAgency,
  fetchingAgency,
  receivedAgency,
} from '../../src/actions/agencies'
import api from '../../src/util/api'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err)
}

const success = {
  ori: 'CAFAKEORI',
  name: 'Fake Agency',
}

describe('agency action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('failedAgency()', () => {
    it('should return AGENCY_FAILED type', () => {
      const actual = failedAgency()
      expect(actual.type).toEqual(AGENCY_FAILED)
    })
  })

  describe('fetchingAgency()', () => {
    it('should return AGENCY_FETCHING type', () => {
      const actual = fetchingAgency()
      expect(actual.type).toEqual(AGENCY_FETCHING)
    })
  })

  describe('receivedAgency()', () => {
    const agency = { ori: 'CA00000' }
    const actual = receivedAgency(agency)

    it('should return AGENCY_RECEIVED type', () => {
      expect(actual.type).toEqual(AGENCY_RECEIVED)
    })

    it('should return agency equal to the object', () => {
      expect(actual.agency).toEqual(agency)
    })
  })

  describe('fetchAgency()', () => {
    it('should be a function', () => {
      expect(typeof fetchAgency).toEqual('function')
    })

    it('should dispatch AGENCY_FETCHING and AGENCY_RECEIVED', done => {
      const dispatch = sandbox.spy()
      sandbox.stub(api, 'getAgency', () => createPromise(success))
      fetchAgency('CAFAKEORI')(dispatch).then(() => {
        const first = dispatch.getCall(0)
        const second = dispatch.getCall(1)
        expect(first.args[0].type).toEqual(AGENCY_FETCHING)
        expect(second.args[0].type).toEqual(AGENCY_RECEIVED)
        done()
      })
    })

    it('should dispatch AGENCY_FAILED if API call fails', done => {
      const dispatch = sandbox.spy()
      sandbox.stub(api, 'getAgency', () => createPromise(undefined, true))
      fetchAgency('CAFAKEORI')(dispatch).then(() => {
        const dispatched = dispatch.getCall(1)
        expect(dispatched.args[0].type).toEqual('AGENCY_FAILED')
        done()
      })
    })
  })
})
