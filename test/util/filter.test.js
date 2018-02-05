/* eslint no-undef: 0 */

import filterUtil from '../../src/util/filter'

describe('filter util', () => {
  describe('crime validation', () => {
    it('should return the passed in crime if it is valid', () => {
      const { pageType } = filterUtil({ pageType: 'homicide' })
      expect(pageType).toEqual('homicide')
    })

    it('should return the default crime if the supplied one is not valid', () => {
      const { pageType } = filterUtil({ pageType: 'fake-crime', page: 'crime' })
      expect(pageType).toEqual('violent-crime')
    })
  })

  describe('place validation', () => {
    it('should return the passed in place if it is valid', () => {
      const { place } = filterUtil({ place: 'california' })
      expect(place).toEqual('california')
    })
  })

  describe('time validation', () => {
    it('should return undefined for since if not provided', () => {
      const { since } = filterUtil({})
      expect(since).toEqual(undefined)
    })

    it('should return undefined for until if not provided', () => {
      const { until } = filterUtil({})
      expect(until).toEqual(undefined)
    })


    it('should return since with a value of ten years less than until if since is greater', () => {
      const { since } = filterUtil({ since: 2020, until: 2000 })
      expect(since).toEqual(1990)
    })

    it('should ensure that the difference between since and until is at least 10 years', () => {
      const { since, until } = filterUtil({ since: 2005, until: 2008 })
      expect(since).toEqual(1998)
      expect(until).toEqual(2008)
    })
})
})
