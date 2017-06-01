/* eslint no-undef: 0 */

import { oriToState } from '../../src/util/ori'

describe('ori utility', () => {
  it('should return the state an ORI is in', () => {
    expect(oriToState('FL123456')).toEqual('florida')
    expect(oriToState('NB123456')).toEqual('nebraska')
    expect(oriToState('NJ123456')).toEqual('new-jersey')
    expect(oriToState('NY123456')).toEqual('new-york')

    // nebraska changed from NB to NE
    // http://about.usps.com/who-we-are/postal-history/state-abbreviations.pdf
  })
})
