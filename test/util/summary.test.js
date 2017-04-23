/* eslint no-undef: 0 */

import mungeSummaryData from '../../src/util/summary'


describe('summary data munging utility', () => {
  it('should return false if summaries is not supplied', () => {
    const crime = 'violent-crime'
    expect(mungeSummaryData(null, crime)).toEqual(false)
  })

  it('should return false if summaries[place] is not supplied', () => {
    const crime = 'violent-crime'
    const summaries = {}
    const place = 'california'
    expect(mungeSummaryData(crime, summaries, place)).toEqual(false)
  })

  it('should reshape the data', () => {
    const crime = 'violent-crime'
    const summaries = {
      california: [{ year: 2014, 'violent-crime': 10, population: 100 }],
      'united-states': [{ year: 2014, 'violent-crime': 10, population: 100 }],
    }
    const place = 'california'
    expect(mungeSummaryData(crime, summaries, place)).toEqual([
      {
        date: 2014,
        california: { count: 10, pop: 100, rate: 10000 },
        'united-states': { count: 10, pop: 100, rate: 10000 },
      }
    ])
  })
})
