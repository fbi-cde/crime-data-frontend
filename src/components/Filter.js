import React from 'react'

const Filter = ({ children, id, legend }) => (
  <fieldset
    id={id}
    className='mt2 pl0 border-none'
  >
    <legend className='col-12 h3 border-bottom'>{legend}</legend>
    {children}
  </fieldset>
)

Filter.propTypes = {
  id: React.PropTypes.string.isRequired,
  legend: React.PropTypes.string.isRequired,
}

export default Filter
