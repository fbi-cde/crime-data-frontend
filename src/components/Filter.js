import React from 'react'

const Filter = ({ children, id, legend }) => (
  <div id={id} className='mb3'>
    <div className='mb2 pb-tiny h5 caps bold border-bottom'>{legend}</div>
    {children}
  </div>
)

Filter.propTypes = {
  id: React.PropTypes.string.isRequired,
  legend: React.PropTypes.string.isRequired,
}

export default Filter
