import PropTypes from 'prop-types'
import React from 'react'

const ErrorCard = ({ error }) =>
  <div className="mb2 p2 white bg-blue fs-14 overflow-auto">
    <p className="m0">
      <strong>Uh-oh!</strong> An error occurred during the request. Please try
      again soon.
    </p>
    <pre className="display-none">{JSON.stringify(error, null, 2)}</pre>
  </div>

ErrorCard.propTypes = {
  error: PropTypes.object.isRequired,
}

export default ErrorCard
