import PropTypes from 'prop-types'
import React from 'react'

class ErrorCard extends React.Component {
  state = { open: false }

  toggle = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const { error } = this.props
    const { open } = this.state
    return (
      <div className="mb2 p2 white bg-blue fs-14 overflow-auto">
        <p className="m0">
          <strong>Uh-oh!</strong> An error occurred during the request. Please
          try
          again soon.
        </p>
        <button
          className="bg-transparent border-none cursor-pointer fs-12 px0 mt2 white"
          onClick={this.toggle}
        >
          {!open ? 'Show' : 'Hide'} error
        </button>
        <pre className={!open && 'display-none'}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }
}

ErrorCard.propTypes = {
  error: PropTypes.object.isRequired,
}

export default ErrorCard
