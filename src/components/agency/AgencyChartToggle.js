import PropTypes from 'prop-types'
import React from 'react'

const btn = 'btn btn-primary p1 sans-serif regular'

const AgencyChartToggle = ({
  isEstimate,
  showNibrs,
  showEstimate,
}) => {
  const btns = [
    {
      handleClick: showEstimate,
      selected: isEstimate,
      text: 'Estimated',
    },
    {
      handleClick: showNibrs,
      selected: !isEstimate,
      text: 'NIBRS',
    },
  ]
  const style = { margin: '5px' }

  return (
    <div className="italic serif">
      {btns.map((b, i) =>
        <button
          className={`${btn} ${!b.selected && 'bg-white blue border-blue'}`}
          key={i}
          onClick={b.handleClick}
          style={style}
        >
          {b.text}
        </button>,
      )}
    </div>
  )
}

AgencyChartToggle.propTypes = {
  isEstimate: PropTypes.bool.isRequired,
  showNibrs: PropTypes.func.isRequired,
  showEstimate: PropTypes.func.isRequired,
}

export default AgencyChartToggle
