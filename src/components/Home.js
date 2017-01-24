/* eslint no-console: 0 */
import React from 'react'

import getStateName from '../util/usa'
import LocationSelect from './LocationSelect'
import { slugify } from '../util/text'
import { updateFilters, updateFiltersAndUrl } from '../actions/filterActions'

import MapSvg from '../../img/usa-map.svg'

const scrollToBottom = () => window.scrollTo(0, window.outerHeight * 1.5)

const Home = ({ appState, dispatch, location }) => {
  const { crime, place } = appState.filters
  const isButtonDisabled = !!(crime && place) || false

  const handleMapClick = e => {
    const id = e.target.getAttribute('id')
    if (!id) return
    dispatch(updateFilters({ place: slugify(getStateName(id)) }))
  }
  const handleSearchClick = () => {
    const change = { crime, place }
    dispatch(updateFiltersAndUrl({ change, location }))
  }
  const selectCrime = e => {
    const action = updateFilters({ crime: slugify(e.target.value) })
    dispatch(action)
  }
  const selectLocation = e => dispatch(updateFilters(e))

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
            className='absolute right-0 cursor-pointer'
            style={{ bottom: '-30px' }}
            src='/img/arrow-down-circle.svg'
            alt='more information below'
            onClick={scrollToBottom}
          />
        </div>
      </section>
      <section className='px2 bg-white'>
        <div className='py7 container'>
          <h2 className='mt0 mb4'>Explore by type of crime and location</h2>
          <div className='clearfix mxn2'>
            <div className='sm-col sm-col-5 px2 mb2 sm-m0'>
              <LocationSelect
                className='col-12 bold field'
                onChange={selectLocation}
                selected={place}
              />
            </div>
            <div className='sm-col sm-col-5 px2 mb2 sm-m0'>
              <select className='col-12 bold field' onChange={selectCrime}>
                <option>Crime Type</option>
                <option>Murder</option>
              </select>
            </div>
            <div className='sm-col sm-col-2 px2 mb2 sm-m0'>
              <button
                className='col-12 btn btn-primary'
                disabled={!isButtonDisabled}
                onClick={handleSearchClick}
              >
                View results
              </button>
            </div>
          </div>
          <div className='py7 sm-col-9 mx-auto'>
            <MapSvg onClick={handleMapClick} />
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
