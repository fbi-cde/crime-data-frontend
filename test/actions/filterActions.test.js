/* eslint no-undef: 0 */

import {
  FILTER_RESET,
  FILTER_UPDATE,
} from '../../src/actions/actionTypes';

import { resetFilter, updateFilter } from '../../src/actions/filterActions';

describe('filterActions', () => {
  describe('resetFilter()', () => {
    it('should return a FILTER_RESET action', () => {
      const id = 'fake-id'
      const actual = resetFilter({ id })
      expect(actual.type).toEqual(FILTER_RESET)
      expect(actual.id).toEqual(id)
    })
  })

  describe('updateFilter()', () => {
    it('should return a FILTER_UPDATE action', () => {
      const id = 'fake-id'
      const value = 'fake-value'
      const actual = updateFilter({ id, value })
      expect(actual.type).toEqual(FILTER_UPDATE)
      expect(actual.id).toEqual(id)
      expect(actual.value).toEqual(value)
    })
  })
})
