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
      css: 'left-rounded'
    },
    {
      handleClick: showNibrs,
      selected: !isSummary,
      text: 'NIBRS',
      css: 'right-rounded'
    },
  ]

  return (
    <div className="mt0 mb2 italic serif inline-block clearfix">
      {btns.map((b, i) =>
        <button
          className={`${btn} ${!b.selected && 'bg-white blue border-blue'}`}
          key={i}
          onClick={b.handleClick}
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
