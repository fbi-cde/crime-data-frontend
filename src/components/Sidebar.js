import React from 'react'

import StateSvg from './StateSvg'

const Sidebar = () => (
  <nav className='site-sidebar bg-white'>
    <div className='p2 sm-p3'>
      <h3 className='mt0 pb1 border-bottom'>Location</h3>
      <div className='py2 center'>
        <StateSvg state='oh' color='tomato' size={150} />
      </div>
      <p>
        Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
        shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
        tongue pig drumstick capicola swine short loin ham hock kevin.
      </p>
    </div>
  </nav>
)

export default Sidebar
