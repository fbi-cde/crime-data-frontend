/* eslint no-undef: 0 */

import {
  formatPerc,
  formatSI,
  formatAxisNum,
  formatYear,
} from '../../src/util/formats'

describe('formats utility', () => {
  it('formatPerc()', () => {
    expect(formatPerc('.213')).toEqual('21%')
    expect(formatPerc('0')).toEqual('<1%')
  })

  it('formatSI()', () => {
    expect(formatSI('1234')).toEqual('1,234')
    expect(formatSI('50123')).toEqual('50.1k')
  })

  it('formatAxisNum()', () => {
    expect(formatAxisNum('12.456')).toEqual('12')
    expect(formatAxisNum('12.6')).toEqual('13')
    expect(formatAxisNum('1.234')).toEqual('1.2')
    expect(formatAxisNum('4.000')).toEqual('4')
  })
})
