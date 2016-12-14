/* eslint no-undef: 0 */

import api from '../../src/util/api'

describe('api utility', () => {
  it('should export a getAllIncidents method', () => {
    expect(typeof api.getAllIncidents).toEqual('function')
  })

  it('should export a getIncidents method', () => {
    expect(typeof api.getIncidents).toEqual('function')
  })
})
