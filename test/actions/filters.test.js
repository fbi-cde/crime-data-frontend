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
      const actual = updateFilters({ place: 'california', pageType: 'robbery' })
      expect(actual.type).toEqual(FILTERS_UPDATE)
      expect(actual.filters.place).toEqual('california')
      expect(actual.filters.pageType).toEqual('robbery')
      expect(actual.filters.page).toEqual('crime')
    })

    it('should default offense to violent-crime if not set properly', () => {
      const actual = updateFilters({ pageType: 'fake-crime', page: 'crime' })
      expect(actual.type).toEqual(FILTERS_UPDATE)
      expect(actual.filters.pageType).toEqual('violent-crime')
    })

    it('should work without any filters passed in', () => {
      const actual = updateFilters({})
      expect(actual.type).toEqual(FILTERS_UPDATE)
    })
  })
})
