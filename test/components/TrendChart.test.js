/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import TrendChart from '../../src/components/trend/TrendChart'

describe('TrendChart', () => {
  const data = [
    ...[2012, 2013, 2014].map(year => ({
      'united-states': {
        population: 100,
        'violent-crime': { count: 10, rate: 100 },
      },
      year,
    })),
  ]
  const filters = {
    since: 2012,
    until: 2014,
    crime: 'violent-crime',
    places: ['united-states'],
  }

  const placeName = 'United States'
  let chart

  beforeEach(() => {
    chart = shallow(<TrendChart data={data} placeName={placeName} filters={filters} crime={filters.pageType} places={filters.places} />)
  })

  it('TrendChart renders svg', () => {
    expect(chart.find('svg').length).toEqual(1)
  })

  describe('createSeries()', () => {
    // it('should return empty arrays if no data is passed in', () => {
    //   const crimes = []
    //   const dataByYear = []
    //   const places = []
    //   const actual = chart.instance().createSeries(crimes, dataByYear, places)
    //   expect(actual).toEqual(false)
    // })

    it('Values created equals the number of elements passed from Sumamary', () => {
      const actual = chart.instance().createSeries(data)
      const { values, place } = actual[0]
      expect(values.length).toEqual(data.length)
    })
  })
})
