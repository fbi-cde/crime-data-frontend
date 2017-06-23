/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import TrendChart from '../../src/components/TrendChart'

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
    place: 'united-states',
  }
  let chart

  beforeEach(() => {
    chart = shallow(<TrendChart data={data} {...filters} />)
  })

  it('TrendChart renders svg', () => {
    expect(chart.find('svg').length).toEqual(1)
  })
})
