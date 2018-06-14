import PropTypes from 'prop-types'
import React from 'react'

const btn = 'btn btn-primary p0 ml-tiny line-height-4 sans-serif regular'

const CountPercentToggle = ({
  ariaControls,
  isCounts,
  showCounts,
  showPercents
}) => {
  const btns = [
    {
      handleClick: showCounts,
      selected: isCounts,
      text: '#'
    },
    {
      handleClick: showPercents,
      selected: !isCounts,
      text: '%'
    }
  ]

  return (
    <div className="mt-tiny fs-10 italic serif">
      View by
      {btns.map((b, i) => (
        <button
          aria-controls={ariaControls}
          className={`${btn} ${!b.selected && 'bg-white blue border-blue'}`}
          key={i}
          onClick={b.handleClick}
          style={{ width: 18 }}
        >
          {b.text}
        </button>
      ))}
    </div>
  )
}

CountPercentToggle.propTypes = {
  ariaControls: PropTypes.string,
  isCounts: PropTypes.bool.isRequired,
  showCounts: PropTypes.func.isRequired,
  showPercents: PropTypes.func.isRequired
}

export default CountPercentToggle
