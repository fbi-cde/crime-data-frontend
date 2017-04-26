import React from 'react'

const ErrorCard = ({ error }) => (
  <div className="p4 bg-white">
    <p className="fs-18">🙁 Data fetching error:</p>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
)

export default ErrorCard
