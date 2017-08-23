/* eslint no-undef: 0 */

import { FILTER_RESET, FILTERS_UPDATE } from '../../src/actions/constants'
import { resetFilter, updateFilters } from '../../src/actions/filters'

describe('filters actions', () => {
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
      const actual = updateFilters({ place: 'california', crime: 'robbery' })
      expect(actual.type).toEqual(FILTERS_UPDATE)
      expect(actual.filters.place).toEqual('california')
      expect(actual.filters.crime).toEqual('robbery')
    })

    it('should default place to united-states if not set properly', () => {
      const actual = updateFilters({ place: 'fake-place' })
      expect(actual.type).toEqual(FILTERS_UPDATE)
      expect(actual.filters.place).toEqual('united-states')
    })

    it('should default offense to violent-crime if not set properly', () => {
      const actual = updateFilters({ crime: 'fake-crime' })
      expect(actual.type).toEqual(FILTERS_UPDATE)
      expect(actual.filters.crime).toEqual('violent-crime')
    })

    it('should work without any filters passed in', () => {
      const actual = updateFilters({})
      expect(actual.type).toEqual(FILTERS_UPDATE)
    })
  })
})
