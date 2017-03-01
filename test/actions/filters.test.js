/* eslint no-undef: 0 */

import {
  FILTER_RESET,
  FILTERS_UPDATE,
} from '../../src/actions/constants'

import { resetFilter, updateFilters } from '../../src/actions/filters'

describe('filters', () => {
  describe('resetFilter()', () => {
    it('should return a FILTER_RESET action', () => {
      const id = 'fake-id'
      const actual = resetFilter({ id })
      expect(actual.type).toEqual(FILTER_RESET)
      expect(actual.id).toEqual(id)
    })
  })

  describe('updateFilters()', () => {
    it('should return a FILTERS_UPDATE action', () => {
      const actual = updateFilters({ 'fake-id': 'fake-value' })
      expect(actual.type).toEqual(FILTERS_UPDATE)
      expect(Object.keys(actual.filters).length).toEqual(1)
    })
  })
})
