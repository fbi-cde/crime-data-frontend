/* eslint-disable no-console */
import React from 'react'

const clearCache = () => {
  if (window && window.caches) {
    caches
      .keys()
      .then(names => Promise.all(names.map(name => caches.delete(name))))
      .then(() => console.log('caches cleared!'))
  }
}

const ClearCacheBtn = () =>
  <button
    type="button"
    className="fixed bottom-0 left-0 m1 px-tiny py0 btn btn-primary bg-red-bright"
    onClick={() => clearCache()}
  >
    ⟲
  </button>

export default ClearCacheBtn
