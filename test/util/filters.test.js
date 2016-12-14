/* eslint no-undef: 0 */

import handleFilters from '../../src/util/filters'

describe('filters utility', () => {
  it('should export a function', () => {
    expect(typeof handleFilters).toEqual('function')
  })

  it('should add a "fake" key to the object', () => {
    const filters = { state_name: 'Ohio' }
    const result = handleFilters(filters)

    expect(result.fake).not.toEqual(undefined)
  })
})
