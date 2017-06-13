import PropTypes from 'prop-types'
import React from 'react'

const ErrorCard = ({ error }) => (
  <div className="mb2 p2 white bg-red-bright fs-14 overflow-auto">
    <p>There was a data fetching error.</p>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
)

ErrorCard.propTypes = {
  error: PropTypes.object.isRequired,
}

export default ErrorCard
