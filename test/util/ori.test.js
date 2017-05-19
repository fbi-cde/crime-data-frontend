/* eslint no-undef: 0 */

import { oriToState } from '../../src/util/ori'

describe('ori utility', () => {
  it('should return the state an ORI is in', () => {
    const actual = oriToState('NJ123456')
    expect(actual).toEqual('new-jersey')
  })
})
