/* eslint no-undef: 0 */

import storage from '../../src/util/localStorage'


const createStorageMock = () => {
  const store = {}

  return {
    getItem: key => (key in store ? store[key] : null),
    setItem: (key, value) => (store[key] = value || ''),
  }
}

describe('localStorage utility', () => {
  describe('without localStorage', () => {
    beforeEach(() => {
      window.localStorage = undefined
    })

    it('getItem() should return null', done => {
      storage.getItem('fake-item').then(item => {
        expect(item).toEqual(null)
        done()
      })
    })

    it('setItem() should return null', () => {
      storage.setItem('fake-item', { fakeKey: 'fake-value' }).then(item => {
        expect(item).toEqual(null)
        done()
      })
    })
  })

  describe('with localStorage', () => {
    beforeEach(() => {
      window.localStorage = createStorageMock()
    })

    describe('getItem()', () => {
      it('should return null if the key does not exist', done => {
        const key = 'fake-item'

        storage.getItem(key).then(item => {
          expect(item).toEqual(null)
          done()
        })
      })

      it('should return the value if it exists', done => {
        const key = 'fake-item'
        const data = { fakeKey: 'fakeValue' }

        window.localStorage.setItem(key, JSON.stringify(data))
        storage.getItem(key).then(item => {
          expect(item).toEqual(data)
          done()
        })
      })
    })

    describe('setItem()', () => {
      it('should return true if set was successful', done => {
        const key = 'fake-item'
        const data = { fakeKey: 'fakeValue' }

        storage.setItem(key, data).then(item => {
          expect(item).toEqual(true)
          done()
        })
      })
    })
  })
})
