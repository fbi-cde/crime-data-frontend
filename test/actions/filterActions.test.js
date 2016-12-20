/* eslint no-undef: 0 */

import {
  FILTER_RESET,
  FILTER_UPDATE,
} from '../../src/actions/actionTypes';

import { reset, update } from '../../src/actions/filterActions';

describe('filterActions', () => {
  describe('reset()', () => {
    it('should return a FILTER_RESET action', () => {
      const id = 'fake-id'
      const actual = reset({ id })
      expect(actual.type).toEqual(FILTER_RESET)
      expect(actual.id).toEqual(id)
    })
  })

  describe('update()', () => {
    it('should return a FILTER_UPDATE action', () => {
      const id = 'fake-id'
      const value = 'fake-value'
      const actual = update({ id, value })
      expect(actual.type).toEqual(FILTER_UPDATE)
      expect(actual.id).toEqual(id)
      expect(actual.value).toEqual(value)
    })
  })
})
