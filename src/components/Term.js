/* eslint no-console: 0 */

import React from 'react'

const showTerm = term => {
  const id = term.target.getAttribute('data-term')
  console.log(`fire off action to show ${id} in the glossary`)
  window.Glossary.show()
  window.Glossary.findTerm(id)
}

const Term = ({ children, id }) => (
  <button
    className='btn p0 bg-navy white align-baseline'
    data-term={id || children}
    onClick={showTerm}
    role='button'
  >
    {children}
  </button>
)

export default Term
