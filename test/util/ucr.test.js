/* eslint no-undef: 0 */

import dataSourcesReportedByState from '../../src/util/ucr'

describe('ucr utility', () => {
  it('should return a value for california', () => {
    const place = 'california'
    const actual = dataSourcesReportedByState(place)

    expect(Object.keys(actual).length).toEqual(2)
  })

  it('should return undefined for a value that doesn\'t exist', () => {
    const place = 'fake-place'
    const actual = dataSourcesReportedByState(place)

    expect(actual).toEqual(undefined)
  })
})
