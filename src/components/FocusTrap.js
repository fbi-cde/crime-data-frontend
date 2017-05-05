import PropTypes from 'prop-types'
import React from 'react'

class FocusTrap extends React.Component {
  componentDidMount() {
    document.addEventListener('focus', this.handleFocus, true)
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('focus', this.handleFocus)
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleFocus = e => {
    if (e.target === this.lastTrapEl) {
      this.props.setFirstFocus(e)
    }
  }

  handleKeydown = e => {
    if (e.shiftKey && e.keyCode === 9 && e.target === this.firstTrapEl) {
      this.props.setLastFocus(e)
    }
  }

  render() {
    return (
      <div>
        <button className="btn p0 right" ref={el => (this.firstTrapEl = el)} />
        {this.props.children}
        <button className="btn p0 right" ref={el => (this.lastTrapEl = el)} />
      </div>
    )
  }
}

FocusTrap.propTypes = {
  setFirstFocus: PropTypes.func.isRequired,
  setLastFocus: PropTypes.func.isRequired,
}

export default FocusTrap
