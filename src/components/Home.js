/* eslint no-console: 0 */
import React from 'react'

import MapSvg from '../../img/usa-map.svg'

const Home = () => {
  const clickMap = e => console.log(e.target.getAttribute('id'))

  return (
    <div>
      <section className='px2 bg-blue-white'>
        <div className='py7 container relative'>
          <h1 className='mt0 pb1 border-bottom'>National, state, and local crime data</h1>
          <p className='m0 col-10 h3 serif'>
            The FBI collects and publishes Uniform Crime Reporting (UCR)
            data on an annual basis. This project is part of our ongoing
            efforts to improve the accuracy and timeliness of the nation’s
            crime statistics.
          </p>
          <img
            className='absolute right-0'
            style={{ bottom: '-30px' }}
            src='/img/arrow-down-circle.svg'
            alt='more information below'
          />
        </div>
      </section>
      <section className='px2 bg-white'>
        <div className='py7 container'>
          <h2 className='mt0 mb4'>Explore by type of crime and location</h2>
          <div className='clearfix mxn2'>
            <div className='sm-col sm-col-5 px2 mb2 sm-m0'>
              <select className='col-12 bold field'>
                <option>Location</option>
              </select>
            </div>
            <div className='sm-col sm-col-5 px2 mb2 sm-m0'>
              <select className='col-12 bold field'>
                <option>Crime Type</option>
              </select>
            </div>
            <div className='sm-col sm-col-2 px2 mb2 sm-m0'>
              <button className='col-12 btn btn-primary'>View results</button>
            </div>
          </div>
          <div className='py7 sm-col-9 mx-auto'>
            <MapSvg onClick={clickMap} />
          </div>
        </div>
      </section>
      <section className='px2 bg-blue-white'>
        <div className='py7 container'>
          <p>TODO...</p>
        </div>
      </section>
    </div>
  )
}

export default Home
