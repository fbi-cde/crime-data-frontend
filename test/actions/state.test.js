/* eslint no-undef: 0, no-console: 0 */

import sinon from 'sinon'

import {
  UCR_STATE_FAILED,
  UCR_STATE_FETCHING,
  UCR_STATE_RECEIVED,
} from '../../src/actions/constants'
import {
  failedUcrState,
  fetchingUcrState,
  receivedUcrState,
  fetchUcrState,
} from '../../src/actions/states'

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

  describe('failedUcrState()', () => {
    it('should return failedUcrState type', () => {
      const actual = failedUcrState()
      expect(actual.type).toEqual(UCR_STATE_FAILED)
    })
  })

  describe('fetchingUcrState()', () => {
    it('should return UCR_State_FETCHING type', () => {
      const actual = fetchingUcrState()
      expect(actual.type).toEqual(UCR_STATE_FETCHING)
    })
  })

  describe('receivedUcrState()', () => {
    it('should return a UCR_State_RECEIVED type action', () => {
      const actual = receivedUcrState()
      expect(actual.type).toEqual(UCR_STATE_RECEIVED)
    })
  })
  /*
  describe('fetchUcrState()', () => {
    it('should trigger fetching and received actions', done => {
      const dispatch = sandbox.spy()
      const fn = () => [createPromise({ results: [] })]
      sandbox.stub(api, 'getUcrStatesRequests', fn)

      fetchUcrState()(dispatch).then(() => {
        console.log('dispatch:', dispatch.getCall(0))
        const first = dispatch.getCall(0)
        const second = dispatch.getCall(1)
        expect(first.args[0].type).toEqual(UCR_State_FETCHING)
        // expect(second.args[0].type).toEqual(UCR_State_RECEIVED)
        done()
      })
    })
  })
  */
})
