/* eslint no-undef: 0 */

import filterUtil from '../../src/util/filter'

describe('filter util', () => {
  it('should return sensible defaults', () => {
    const actual = filterUtil({})
    expect(actual).toEqual({
      crime: 'violent-crime',
      place: 'united-states',
      since: 2005,
      until: 2015,
    })
  })

  describe('crime validation', () => {
    it('should return the passed in crime if it is valid', () => {
      const { crime } = filterUtil({ crime: 'homicide' })
      expect(crime).toEqual('homicide')
    })

    it('should return the default crime if the supplied one is not valid', () => {
      const { crime } = filterUtil({ crime: 'fake-crime' })
      expect(crime).toEqual('violent-crime')
    })
  })

  describe('place validation', () => {
    it('should return the passed in place if it is valid', () => {
      const { place } = filterUtil({ place: 'california' })
      expect(place).toEqual('california')
    })

    it('should return the default place if the supplied one is not valid', () => {
      const { place } = filterUtil({ place: 'fake-place' })
      expect(place).toEqual('united-states')
    })
  })

  describe('time validation', () => {
    it('should return defaults for since if not provided', () => {
      const { since } = filterUtil({})
      expect(since).toEqual(2005)
    })

    it('should return defaults for until if not provided', () => {
      const { until } = filterUtil({})
      expect(until).toEqual(2015)
    })

    it('should return defaults if since is greater than until', () => {
      const { since, until } = filterUtil({ since: 2020, until: 2000 })
      expect(since).toEqual(2005)
      expect(until).toEqual(2015)
    })

    it('should ensure that the difference between since and until is at least 10 years', () => {
      const { since, until } = filterUtil({ since: 2005, until: 2008 })
      expect(since).toEqual(1998)
      expect(until).toEqual(2008)
    })
  })
})
