/* eslint no-undef: 0 */

import sinon from 'sinon'


import * as historyUtil from '../../src/util/history'
import * as filterActions from '../../src/actions/filters'
import {
  shouldFetchUcr,
  shouldFetchSummaries,
  shouldFetchNibrs,
  updateApp,
} from '../../src/actions/composite'
import { nationalKey } from '../../src/util/usa'

const noop = () => {}

describe('composite actions', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(historyUtil, 'createNewLocation', noop)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('shouldFetchUcr()', () => {
    it('should return false for national key', () => {
      const result = shouldFetchUcr({ place: nationalKey })
      expect(result).toEqual(false)
    })

    it('should return true for valid state names', () => {
      const result = shouldFetchUcr({ place: 'montana' })
      expect(result).toEqual(true)
    })
  })

  describe('shouldFetchSummaries()', () => {
    it('should return undefined if crime or place are missing', () => {
      const result = shouldFetchSummaries({ place: nationalKey })
      expect(result).toEqual(undefined)
    })

    it('should return a truthy value if crime and place are present', () => {
      const result = shouldFetchSummaries({ crime: 'homicide', place: 'montana' })
      expect(!!result).toEqual(true)
    })
  })

  describe('shouldFetchNibrs()', () => {
    it('should return false if place does not submit NIBRS', () => {
      const result = shouldFetchNibrs({ place: 'new-york' })
      expect(result).toEqual(false)
    })

    it('should return an object with "initial-year"if place submits NIBRS', () => {
      const result = shouldFetchNibrs({ place: 'montana' })
      expect(Object.prototype.hasOwnProperty.call(result, 'initial-year')).toEqual(true)
    })
  })

  describe('updateApp()', () => {
    it('should call updateFilters() with change', () => {
      const changes = { place: 'montana', crime: 'homicide' }
      const dispatch = sandbox.spy()
      const spy = sandbox.stub(filterActions, 'updateFilters', noop)
      sandbox.stub(historyUtil.default, 'push', noop)

      updateApp(changes, {})(dispatch)
      expect(spy.args[0]).toEqual([changes])
    })

    it('should update history if location is provided', () => {
      const changes = { place: 'montana', crime: 'homicide' }
      const dispatch = sandbox.spy()
      const historySpy = sandbox.stub(historyUtil.default, 'push', noop)

      updateApp(changes, {})(dispatch)
      expect(historySpy.callCount).toEqual(1)
    })

    it('should not update history if location is missing', () => {
      const dispatch = sandbox.spy()
      const historySpy = sandbox.spy(historyUtil.default, 'push')
      const changes = { place: 'montana', crime: 'homicide' }
      updateApp(changes)(dispatch)
      expect(historySpy.callCount).toEqual(0)
    })
  })
})
