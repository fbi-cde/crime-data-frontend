import PropTypes from 'prop-types'
import React from 'react'
import generateId from '../../util/id'

const btn = 'btn btn-primary p0 ml-tiny line-height-4 sans-serif regular'

const NibrsCountPercentToggle = ({
  ariaControls,
  isCounts,
  showCounts,
  showPercents,
  id,
}) => {
  const btns = [
    {
      handleClick: showCounts,
      selected: isCounts,
      text: '#',
      id: id,
    },
    {
      handleClick: showPercents,
      selected: !isCounts,
      text: '%',
      id: id,
    },
  ]

  return (
    <div className="mt-tiny fs-10 italic serif">
      View by
      {btns.map((b, i) =>
        <button
          aria-controls={ariaControls}
          className={`${btn} ${!b.selected && 'bg-white blue border-blue'}`}
          key={i}
          onClick={b.handleClick}
          style={{ width: 18 }}
          id={generateId(b.id+'-toggle-'+b.text)}
        >
          {b.text}
        </button>,
      )}
    </div>
  )
}

NibrsCountPercentToggle.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  isCounts: PropTypes.bool.isRequired,
  showCounts: PropTypes.func.isRequired,
  showPercents: PropTypes.func.isRequired,
}

export default NibrsCountPercentToggle
