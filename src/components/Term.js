import lowerCase from 'lodash.lowercase'
import PropTypes from 'prop-types'
import React from 'react'

import { showTerm } from '../actions/glossary'

const Term = ({ children, dispatch, id }) => {
  const handler = e => {
    e.preventDefault()
    dispatch(showTerm(id))
  }

  return (
    <a
      aria-label={`show ${lowerCase(id)} in the glossary`}
      className="border-bottom-dotted"
      href="#!"
      onClick={handler}
    >
      {children}
      <img
        alt="glossary lookup"
        aria-hidden="true"
        className="ml-tiny"
        src="/img/glossary.svg"
        width="9"
      />
    </a>
  )
}

Term.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default Term
