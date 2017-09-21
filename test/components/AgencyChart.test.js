/* eslint no-undef: 0 */

import AgencyChart from '../../src/components/agency/AgencyChart'

describe('AgencyChart component', () => {
  describe('getActive()', () => {
    it('should return the most recent year as "active"', () => {
      const component = new AgencyChart()
      const data = [
        { year: 2000, reported: 10, cleared: 10 },
        { year: 2001, reported: 10, cleared: 10 },
        { year: 2002, reported: 10, cleared: 10 },
        { year: 2003, reported: 10, cleared: 10 },
      ]
      const actual = component.getActive(data)
      expect(actual.active.year).toEqual(2003)
    })

    it('should return the second most recent year as "priorYear"', () => {
      const component = new AgencyChart()
      const data = [
        { year: 2000, reported: 10, cleared: 10 },
        { year: 2001, reported: 10, cleared: 10 },
        { year: 2002, reported: 10, cleared: 10 },
        { year: 2003, reported: 10, cleared: 10 },
      ]
      const actual = component.getActive(data)
      expect(actual.priorYear.year).toEqual(2002)
    })

    it('should use state.yearSelected to determine other year', () => {
      const component = new AgencyChart()
      const data = [
        { year: 2000, reported: 10, cleared: 10 },
        { year: 2001, reported: 10, cleared: 10 },
        { year: 2002, reported: 10, cleared: 10 },
        { year: 2003, reported: 10, cleared: 10 },
      ]
      component.state = { ...component.state, yearSelected: 2002 }
      const actual = component.getActive(data)
      expect(actual.active.year).toEqual(2002)
    })

    it('should return an empty count if state.yearSelected but data is not reported', () => {
      const component = new AgencyChart()
      const data = [
        { year: 2000, reported: 10, cleared: 10 },
        { year: 2002, reported: 10, cleared: 10 },
        { year: 2003, reported: 10, cleared: 10 },
      ]
      component.state = { ...component.state, yearSelected: 2001 }
      const { active } = component.getActive(data)
      expect(active.year).toEqual(2001)
      expect(active.cleared.count).toEqual(0)
      expect(active.reported.count).toEqual(0)
    })
  })

  describe('getNoDataYears()', () => {
    it('should return an array of all years if all data is missing', () => {
      const component = new AgencyChart()
      const data = []
      const actual = component.getNoDataYears(data, 2000, 2005)
      expect(actual).toEqual([2000, 2001, 2002, 2003, 2004, 2005])
    })

    it('should return an array of just the years with data missing', () => {
      const component = new AgencyChart()
      const data = [
        { year: 2000, reported: 10, cleared: 10 },
        { year: 2003, reported: 10, cleared: 10 },
      ]
      const actual = component.getNoDataYears(data, 2000, 2005)
      expect(actual.includes(2000)).toEqual(false)
      expect(actual.includes(2003)).toEqual(false)
      expect(actual).toEqual([2001, 2002, 2004, 2005])
    })
  })
})
