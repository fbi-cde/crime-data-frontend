import PropTypes from 'prop-types'
import React from 'react'

const Loading = ({ slim, text }) =>
  <div className={`${slim ? '' : 'mt3 mb8'} fs-14 caps sans-serif center`}>
    <img
      className="align-middle mr1"
      width="30"
      height="30"
      src="/img/loading.svg"
      alt="Loading..."
    />
    {text}
  </div>

Loading.defaultProps = {
  slim: false,
  text: 'Loading',
}

Loading.propTypes = {
  slim: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}

export default Loading
