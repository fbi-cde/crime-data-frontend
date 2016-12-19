import React from 'react'

const DetailsCard = ({
  data,
  title,
}) => (
  <div className='p2 bg-silver'>
    <h2 className='mt0'>{title}</h2>
    {JSON.stringify(data)}
  </div>
)

export default DetailsCard
