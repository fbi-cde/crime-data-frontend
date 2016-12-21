import React from 'react'

const Filter = ({ children, id, legend }) => (
  <fieldset
    id={id}
    className='border-none mt2 pl0'
  >
    <legend className='border-bottom col-12 h3'>
      {legend}
    </legend>
    { children }
  </fieldset>
)

Filter.propTypes = {
  id: React.PropTypes.string.isRequired,
  legend: React.PropTypes.string.isRequired,
}

export default Filter
