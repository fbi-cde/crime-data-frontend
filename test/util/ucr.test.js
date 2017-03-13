/* eslint no-undef: 0 */

import dataSourcesReportedByState, {
  shouldFetchUcr,
  shouldFetchSummaries,
  shouldFetchNibrs,
} from '../../src/util/ucr'
import { nationalKey } from '../../src/util/usa'

describe('ucr utility', () => {
  it('should return a value for california', () => {
    const place = 'california'
    const actual = dataSourcesReportedByState(place)

    expect(Object.keys(actual).length).toEqual(2)
  })

  it('should return undefined for a value that doesn\'t exist', () => {
    const place = 'fake-place'
    const actual = dataSourcesReportedByState(place)

    expect(actual).toEqual(undefined)
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

    it('should return false for invalid state names', () => {
      const result = shouldFetchUcr({ place: 'not-a-place' })
      expect(result).toEqual(false)
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
})
