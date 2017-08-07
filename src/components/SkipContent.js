import PropTypes from 'prop-types'
import React from 'react'

const selectables = ['a[href]', 'input', 'select', 'textarea']
const getSelectors = skipTo =>
  selectables
    .map(s => [`${skipTo} ${s}`, `${skipTo} ${s}:not([disabled])`])
    .reduce((a, n) => a.concat(n))
    .join(', ')

const SkipContent = ({ skipTo }) =>
  <button
    className="fixed bg-blue-white border-none top-0 left-n100 left-0-focus px4 py2"
    onClick={e => {
      if (!skipTo) return
      e.preventDefault()
      document.querySelector(getSelectors(skipTo)).focus()
    }}
  >
    Skip content
  </button>

SkipContent.propTypes = {
  skipTo: PropTypes.string,
}

export default SkipContent
