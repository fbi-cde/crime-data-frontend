/* eslint no-undef: 0 */

import jsonToCsv from '../../src/util/csv'

const simpleJson = [
  { simpleKey: 'value1A', secondKey: 'value1B' },
  { simpleKey: 'value2A', secondKey: 'value2B' },
]
const nestedJson = [
  { simpleKey: 'value1A', secondKey: { childKey: 'value1B1' } },
  { simpleKey: 'value2A', secondKey: { childKey: 'value2B1' } },
]

describe('csv utility', () => {
  describe('when json is not nested', () => {
    it('should return a simple csv string', () => {
      const csv = jsonToCsv([...simpleJson])
      const expected = 'simpleKey,secondKey\nvalue1A,value1B\nvalue2A,value2B'
      expect(csv).toEqual(expected)
    })
  })

  describe('when json is nested', () => {
    it('should return a csv string with derived columns', () => {
      const csv = jsonToCsv([...nestedJson])
      const expected =
        'simpleKey,secondKey.childKey\nvalue1A,value1B1\nvalue2A,value2B1'
      expect(csv).toEqual(expected)
    })
  })
})
