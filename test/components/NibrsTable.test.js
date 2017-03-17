import { shallow } from 'enzyme'
import React from 'react'

import NibrsTable from '../../src/components/NibrsTable'


describe('NibrsTable', () => {
  const data = n => [...Array(n)].map((_, i) => ({ key: i, count: 10 }))

  it('NibrsTable has row for each data entry', () => {
    const entries = 3
    const table = shallow(<NibrsTable data={data(entries)} />)

    expect(table.find('tbody tr').length).toEqual(entries)
  })

  it('NibrsTable collapses entries above rowLim into 1 row', () => {
    const [entries, rowLim] = [15, 5]
    const table = shallow(<NibrsTable data={data(entries)} rowLim={rowLim} />)
    const otherCell = table.find('tbody tr td').last()

    expect(table.find('tbody tr').length).toEqual(rowLim + 1)
    expect(otherCell.text()).toEqual(`Other (${entries - rowLim})`)
  })
})
