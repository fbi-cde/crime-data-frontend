import { reshape, rename } from '../../src/util/nibrs'

describe('nibrs utility', () => {
  describe('reshape()', () => {
    it('should aggregate counts by key, convert to array', () => {
      const data = [
        { foo: 'a', count: 1 },
        { foo: 'a', count: 2 },
        { foo: 'a', count: 3 },
        { foo: 'b', count: 10 },
        { foo: 'b', count: 20 },
      ]

      expect(reshape(data, 'foo')).toEqual([
        { key: 'a', count: 6 },
        { key: 'b', count: 30 },
      ])
    })
  })

  describe('rename()', () => {
    it('should change key field, keep count field', () => {
      const data = [{ key: 'a', count: 1 }, { key: 'b', count: 2 }]
      const lookup = { a: 'foo', b: 'bar' }

      expect(rename(data, lookup)).toEqual([
        { key: 'foo', count: 1 }, { key: 'bar', count: 2 },
      ])
    })
  })
})
