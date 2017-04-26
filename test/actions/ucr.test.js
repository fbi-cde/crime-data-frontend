/* eslint no-undef: 0, no-console: 0 */

import sinon from 'sinon'

import {
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from '../../src/actions/constants'
import {
  fetchingUcrParticipation,
  receivedUcrParticipation,
  fetchUcrParticipation,
} from '../../src/actions/ucr'
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

  describe('fetchingUcrParticipation()', () => {
    it('should return UCR_PARTICIPATION_FETCHING type', () => {
      const actual = fetchingUcrParticipation()
      expect(actual.type).toEqual(UCR_PARTICIPATION_FETCHING)
    })
  })

  describe('receivedUcrParticipation()', () => {
    const action = {
      'north-carolina': [1, 2, 3],
    }

    it('should return a UCR_PARTICIPATION_RECEIVED type action', () => {
      const actual = receivedUcrParticipation(action)
      expect(actual.type).toEqual(UCR_PARTICIPATION_RECEIVED)
      expect(actual.results['north-carolina']).toEqual([1, 2, 3])
    })
  })

  describe('fetchUcrParticipation()', () => {
    it('should trigger fetching and received actions', done => {
      const dispatch = sandbox.spy()
      const fn = () => [createPromise({ place: 'california', results: [] })]
      sandbox.stub(api, 'getUcrParticipationRequests', fn)

      fetchUcrParticipation({ place: 'california' })(dispatch).then(() => {
        const first = dispatch.getCall(0)
        const second = dispatch.getCall(1)
        expect(first.args[0].type).toEqual(UCR_PARTICIPATION_FETCHING)
        expect(second.args[0].type).toEqual(UCR_PARTICIPATION_RECEIVED)
        done()
      })
    })

    it('should call api.getUcrParticipationRequests', done => {
      const dispatch = sandbox.spy()
      const fn = () => [createPromise({ place: 'california', results: [] })]
      const spy = sandbox.stub(api, 'getUcrParticipationRequests', fn)
      fetchUcrParticipation({ place: 'california' })(dispatch).then(() => {
        expect(spy.callCount).toEqual(1)
        done()
      })
    })
  })
})
