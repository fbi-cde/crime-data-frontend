/* eslint no-undef: 0 */

import history, { createNewLocation } from '../../src/util/history'


describe('history utility', () => {
  it('should export a react-router history singleton', () => {
    expect(typeof history.createHref).toEqual('function')
    expect(typeof history.push).toEqual('function')
  })

  describe('createNewLocation()', () => {
    const mockRouter = {
      location: { query: {} },
      params: { crime: 'murder', place: 'oregon' }
    }
    it('should change the place value in pathname', () => {
      const change = { place: 'california' }
      const router = Object.assign({}, mockRouter)
      const actual = createNewLocation({ change, router })
      expect(actual.pathname).toEqual('/explorer/state/california/murder')
    })

    it('should change the crime value in pathname', () => {
      const change = { crime: 'robbery' }
      const router = Object.assign({}, mockRouter)
      const actual = createNewLocation({ change, router })
      expect(actual.pathname).toEqual('/explorer/state/oregon/robbery')
    })

    it('should put other changes in the query object', () => {
      const change = { until: 2017 }
      const router = Object.assign({}, mockRouter)
      const actual = createNewLocation({ change, router })
      expect(actual.query.until).toEqual(2017)
    })

    it('should ignore place and crime for the query', () => {
      const change = { crime: 'robbery' }
      const router = Object.assign({}, mockRouter)
      const actual = createNewLocation({ change, router })
      expect(actual.query).toEqual({})
    })
  })
})
