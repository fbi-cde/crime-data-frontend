import PropTypes from 'prop-types'
import React from 'react'

class OnEscape extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = e => {
    if (e.keyCode !== 27) return
    this.props.handler(e)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

OnEscape.propTypes = {
  handler: PropTypes.func.isRequired,
}

export default OnEscape
