import React from 'react'

const Loading = ({ text }) => (
  <div className="mt3 mb8 fs-14 caps sans-serif center">
    <img
      className="align-middle mr1"
      width="30"
      height="30"
      src="/img/loading.svg"
      alt="loading..."
    />
    {text || 'Loading'}
  </div>
)

export default Loading
