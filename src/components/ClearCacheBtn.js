import React from 'react'

const clearCache = () => {
  if (typeof window !== 'undefined' && window.caches) {
    Promise.all(caches.keys().then(name => caches.delete(name)))
  }
}

const ClearCacheBtn = () => (
  <button
    type="button"
    className="fixed bottom-0 left-0 m1 px-tiny py0 btn btn-primary bg-red-bright"
    onClick={() => clearCache()}
  >
    ⟲
  </button>
)

export default ClearCacheBtn
