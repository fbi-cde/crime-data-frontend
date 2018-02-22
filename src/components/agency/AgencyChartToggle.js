import PropTypes from 'prop-types'
import React from 'react'

const btn = 'btn btn-primary p1 sans-serif regular'

const AgencyChartToggle = ({
  isSummary,
  showNibrs,
  showSummary,
}) => {
  const btns = [
    {
      handleClick: showSummary,
      selected: isSummary,
      text: 'Summary',
    },
    {
      handleClick: showNibrs,
      selected: !isSummary,
      text: 'NIBRS',
    },
  ]
  const style = { margin: '5px' }

  return (
    <div className="mt0 mb2 italic serif">
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
  isSummary: PropTypes.bool.isRequired,
  showNibrs: PropTypes.func.isRequired,
  showSummary: PropTypes.func.isRequired,
}

export default AgencyChartToggle
