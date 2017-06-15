import React from 'react'

const clearCache = () => {
  if (typeof window !== 'undefined' && window.caches) {
    caches.keys().then(keys => {
      keys.map(key => key && caches.delete(key))
    })
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
