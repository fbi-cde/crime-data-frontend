import React from 'react';
import { shallow } from 'enzyme';

import TimeChart from '../../src/components/TimeChart';

describe('TimeChart', () => {
  const data = [
    { date: '2016-01-01', foo: 5, bar: 7 },
    { date: '2016-01-02', foo: 7, bar: 2 },
    { date: '2016-01-03', foo: 4, bar: 4 },
  ]
  const keys = ['foo', 'bar']
  let chart

  beforeEach(() => {
    chart = shallow(<TimeChart data={data} keys={keys} />)
  });

  it('TimeChart renders svg', () => {
    expect(chart.find('svg').length).toEqual(1)
  })

  it('TimeChart has a line (<path>) for each series', () => {
    expect(chart.find('.series path').length).toEqual(keys.length)
  })

  it('TimeChart has a <circle> for each data point', () => {
    expect(chart.find('.series-foo circle').length).toEqual(data.length)
  })
})
