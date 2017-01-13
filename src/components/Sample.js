import React from 'react'

import StateThumbnail from './StateThumbnail'

const Sample = () => (
  <section className='container px2 py3'>
    <h1 className='mt0'>Hello!</h1>
    <StateThumbnail place='Ohio' />
    <div className='clearfix mxn2'>
      <div className='sm-col sm-col-8 md-col-9 px2'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='mb3'>
            <h2 className='h3'>
              <a href='#!' className='black'>Bacon ipsum</a>
            </h2>
            <p>
              Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
              shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
              tongue pig drumstick capicola swine short loin ham hock kevin.
            </p>
          </div>
        ))}
      </div>
      <div className='sm-col sm-col-4 md-col-3 px2 sm-show'>
        <h3 className='h4'>Categories</h3>
        <ul className='list-reset'>
          <li><a href='#!'>Bacon</a></li>
          <li><a href='#!'>Bratwurst</a></li>
          <li><a href='#!'>Andouille</a></li>
          <li><a href='#!'>Pastrami</a></li>
        </ul>
      </div>
    </div>
  </section>
)

export default Sample
