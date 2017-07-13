import lowerCase from 'lodash.lowercase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { showTerm } from '../actions/glossary'

const imgSize = size => {
  const options = { sm: 10, md: 14, lg: 18 }
  return options[size] || options.md
}

const Term = ({ children, dispatch, id, size = 'md' }) => {
  const handler = e => {
    e.preventDefault()
    dispatch(showTerm(id))
  }

  return (
    <button
      aria-label={`Show ${lowerCase(id)} in the glossary`}
      className="bg-transparent border-none border-bottom-dotted color-inherit cursor-pointer font-family-inherit font-size-inherit p0"
      onClick={handler}
    >

      {children}
      <img
        alt="glossary lookup"
        aria-hidden="true"
        className="ml-tiny"
        src="/img/glossary.svg"
        width={imgSize(size)}
      />
    </button>
  )
}

Term.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(Term)
