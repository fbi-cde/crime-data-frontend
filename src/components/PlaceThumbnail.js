import React from 'react'

import lookupUsa from '../util/usa'

const PlaceThumbnail = ({ place }) => (
  <div className='col-10 mx-auto'>
    <div className='aspect-ratio aspect-ratio--1x1'>
      <img
        alt={place}
        className='aspect-ratio--object'
        src={`/svg/${lookupUsa(place)}.svg`}
      />
    </div>
  </div>
)


export default PlaceThumbnail
