import React from 'react'

const DevBtn = () => (
  <button
    type="button"
    className="fixed bottom-0 left-0 m1 px-tiny py0 btn btn-primary bg-red-bright"
    onClick={() => window.localStorage.clear()}
  >
    ⟲
  </button>
)

export default DevBtn
