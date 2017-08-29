/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import NibrsTableWithBars from '../../src/components/nibrs/NibrsTableWithBars'

describe('NibrsTableWithBars', () => {
  const data = n => [...Array(n)].map((_, i) => ({ key: i + 1, count: 10 }))

  it('has row for each data entry', () => {
    const entries = 3
    const table = shallow(<NibrsTableWithBars data={data(entries)} id="test" />)

    expect(table.find('tbody tr').length).toEqual(entries)
  })

  it('collapses entries above rowLim into 1 row', () => {
    const [entries, rowLim] = [15, 5]
    const table = shallow(
      <NibrsTableWithBars data={data(entries)} id="test" rowLim={rowLim} />,
    )
    const otherCell = table.find('tbody tr td').last()

    expect(table.find('tbody tr').length).toEqual(rowLim + 1)
    expect(otherCell.text()).toEqual(`Other (${entries - rowLim})`)
  })
})
