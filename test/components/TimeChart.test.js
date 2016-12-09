import React from 'react';
import { shallow } from 'enzyme';

import TimeChart from '../../src/components/TimeChart';

describe('TimeChart', () => {
  const data = [['2016-01-01', 5], ['2016-01-02', 7]]
  let chart

  beforeEach(() => {
    chart = shallow(<TimeChart data={data} />)
  });

  it('TimeChart renders svg', () => {
    expect(chart.find('svg').length).toEqual(1)
  })

  it('TimeChart has a circle element for each data point', () => {
    expect(chart.find('circle').length).toEqual(data.length)
  })
})
