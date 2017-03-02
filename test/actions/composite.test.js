/* eslint no-undef: 0 */

import sinon from 'sinon'


import * as historyUtil from '../../src/util/history'
import * as filterActions from '../../src/actions/filters'
import { updateApp } from '../../src/actions/composite'

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

  describe('updateApp()', () => {
    it('should call updateFilters() with change', () => {
      const changes = { place: 'montana', crime: 'homicide' }
      const dispatch = sandbox.spy()
      const spy = sandbox.stub(filterActions, 'updateFilters', noop)
      sandbox.stub(historyUtil.default, 'push', noop)

      updateApp(changes, {})(dispatch)
      expect(spy.args[0]).toEqual([changes])
    })

    it('should call dispatch twice (updateFilters() and fetchData())', () => {
      const changes = { place: 'montana', crime: 'homicide' }
      const dispatch = sandbox.spy()
      sandbox.stub(filterActions, 'updateFilters', noop)
      sandbox.stub(historyUtil.default, 'push', noop)

      updateApp(changes, {})(dispatch)
      expect(dispatch.callCount).toEqual(2)
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
