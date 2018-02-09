import PropTypes from 'prop-types'
import React from 'react'

class NoDataCard extends React.Component {
  state = { open: false }

  toggle = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const { noun, year } = this.props
    const { open } = this.state
    return (
      <div className="mb2 p2 white bg-blue fs-14 overflow-auto">
        <p className="m0">
           No {noun} data submitted for {year}
        </p>
      </div>
    )
  }
}

NoDataCard.propTypes = {
  noun: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
}

export default NoDataCard
