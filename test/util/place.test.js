/* eslint no-undef: 0 */

import { getPlaceInfo } from '../../src/util/place'
import { nationalKey } from '../../src/util/usa'

// export const getPlaceInfo = ({ place, placeType }) => ({
//   place: place || nationalKey,
//   placeType: placeType || 'national',
// })

describe('place util', () => {
  it('should return values if passed in', () => {
    const actual = getPlaceInfo({ place: 'california', placeType: 'state' })
    expect(actual.place).toEqual('california')
    expect(actual.placeType).toEqual('state')
  })

  it('should return national defaults if empty object is passed', () => {
    const actual = getPlaceInfo({})
    expect(actual.place).toEqual(nationalKey)
    expect(actual.placeType).toEqual('national')
  })

  it('should return national defaults if nothing is passed', () => {
    const actual = getPlaceInfo()
    expect(actual.place).toEqual(nationalKey)
    expect(actual.placeType).toEqual('national')
  })
})
