/* eslint no-undef: 0, no-console: 0 */

import sinon from 'sinon'

import {
  UCR_REGION_FAILED,
  UCR_REGION_FETCHING,
  UCR_REGION_RECEIVED,
} from '../../src/actions/constants'
import {
  failedUcrRegion,
  fetchingUcrRegion,
  receivedUcrRegion,
  fetchUcrRegion,
} from '../../src/actions/region'

import api from '../../src/util/api'

const createPromise = (res, err) => {
  if (!err) return Promise.resolve(res)
  return Promise.reject(err)
}

describe('ucr actions', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('failedUcrParticipation()', () => {
    it('should return failedUcrRegion type', () => {
      const actual = failedUcrRegion()
      expect(actual.type).toEqual(UCR_REGION_FAILED)
    })
  })

  describe('fetchingUcrRegion()', () => {
    it('should return UCR_REGION_FETCHING type', () => {
      const actual = fetchingUcrRegion()
      expect(actual.type).toEqual(UCR_REGION_FETCHING)
    })
  })

  describe('receivedUcrRegion()', () => {
    it('should return a UCR_REGION_RECEIVED type action', () => {
      const actual = receivedUcrRegion()
      expect(actual.type).toEqual(UCR_REGION_RECEIVED)
    })
  })

  describe('fetchUcrRegion()', () => {
    it('should trigger fetching and received actions', done => {
      const dispatch = sandbox.spy()
      const fn = () => [createPromise({ results: [] })]
      sandbox.stub(api, 'getUcrRegionRequests', fn)

      fetchUcrRegion()(dispatch).then(() => {
        const first = dispatch.getCall(0)
        const second = dispatch.getCall(1)
        expect(first.args[0].type).toEqual(UCR_REGION_FETCHING)
        expect(second.args[0].type).toEqual(UCR_REGION_RECEIVED)
        done()
      })
    })
  })
})
