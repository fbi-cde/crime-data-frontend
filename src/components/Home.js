/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'

import LocationSelect from './LocationSelect'
import { slugify } from '../util/text'
import stateLookup from '../util/usa'
import Term from './Term'
import { updateFilters, updateFiltersAndUrl } from '../actions/filterActions'

import otherDataSets from '../../content/datasets.yml'
import usaSvgData from '../../data/usa-state-svg.json'

const scrollToBottom = () => window.scrollTo(0, window.outerHeight * 1.5)

const Home = ({ appState, dispatch, location }) => {
  const { crime, place } = appState.filters
  const placeId = place && stateLookup(place).toUpperCase()
  const isButtonDisabled = !!(crime && place) || false

  const handleMapClick = e => {
    const id = e.target.getAttribute('id')
    if (!id) return
    dispatch(updateFilters({ place: slugify(stateLookup(id)) }))
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
        <div className='py7 container mx-auto relative'>
          <h1 className='mt0 pb1 fs-28 sm-fs-40 border-bottom border-red-bright'>
            National, state, and local crime data
          </h1>
          <p className='m0 col-10 fs-18 sm-fs-24 serif'>
            The FBI collects and publishes
            <Term
              dispatch={dispatch}
              id='uniform crime reporting (ucr)'
            >
              Uniform Crime Reporting (UCR)
            </Term>
            data on an annual basis. This project is part of our ongoing
            efforts to improve the accuracy and timeliness of the nation’s
            crime statistics.
          </p>
          <img
            className='absolute right-0 cursor-pointer'
            style={{ bottom: '-30px' }}
            width='60px'
            height='60px'
            src='/img/arrow-down-circle.svg'
            alt='more information below'
            onClick={scrollToBottom}
          />
        </div>
      </section>
      <section className='px2 bg-white'>
        <div className='py7 container mx-auto'>
          <h2 className='mt0 mb4 fs-22 sm-fs-32'>
            Explore by type of crime and location
          </h2>
          <div className='clearfix mxn2'>
            <div className='sm-col sm-col-4 px2 mb2 sm-m0'>
              <LocationSelect
                className='col-12 sm-fs-18 bold field'
                onChange={selectLocation}
                selected={place}
              />
            </div>
            <div className='sm-col sm-col-4 px2 mb2 sm-m0'>
              <select
                className='col-12 sm-fs-18 bold field'
                onChange={selectCrime}
                defaultValue={crime || ''}
              >
                <option value='' disabled>Crime Type</option>
                <optgroup label='Violent Crime'>
                  <option value='all-violent-crime'>All Violent Crime</option>
                  <option value='homicide'>Homicide</option>
                  <option value='rape'>Rape</option>
                  <option value='robbery'>Robbery</option>
                  <option value='aggravated-assault'>Aggravated Assault</option>
                </optgroup>
                <optgroup label='Property Crime'>
                  <option value='all-property-crime'>
                    All Property Crime
                  </option>
                  <option value='arson'>Arson</option>
                  <option value='burglary'>Burglary</option>
                  <option value='larceny-theft'>Larceny Theft</option>
                  <option value='motor-vehicle-theft'>Motor Vehicle Theft</option>
                </optgroup>
              </select>
            </div>
            <div className='sm-col sm-col-4 px2 mb2 sm-m0 xs-hide'>
              <button
                className='col-12 btn btn-primary'
                disabled={!isButtonDisabled}
                onClick={handleSearchClick}
              >
                View results
              </button>
            </div>
          </div>
          <div className='py4 sm-py7 sm-col-9 mx-auto'>
            <svg
              className='cursor-pointer usa-map'
              viewBox='0 0 959 593'
              preserveAspectRatio='xMidYMid'
            >
              <title>USA</title>
              <g onClick={handleMapClick}>
                {usaSvgData.map(s => (
                  <path
                    d={s.d}
                    className={s.id === placeId ? 'fill-red-bright' : 'fill-blue-light'}
                    id={s.id}
                    key={s.id}
                  />
                ))}
              </g>
            </svg>
          </div>
          <div className='mb7 sm-hide md-hide lg-hide'>
            <button
              className='btn btn-primary'
              disabled={!isButtonDisabled}
              onClick={handleSearchClick}
            >
              View results
            </button>
          </div>
          <h2 className='mt0 mb3 fs-22 sm-fs-32'>Data downloads</h2>
          <div className='clearfix mxn2'>
            {otherDataSets.map((d, i) => (
              <div key={i} className='sm-col sm-col-4 px2 mb2 sm-m0'>
                <div className='px3 py2 bg-blue-white'>
                  <div className='mb1 pb1 fs-ch2 bold border-bottom border-red-bright'>
                    {d.title}
                  </div>
                  <p className='mb2'>{d.description}</p>
                  <button className='mb1 btn btn-primary btn-sm'>
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='px2 bg-blue-white'>
        <div className='py7 container mx-auto'>
          <h2 className='mt0 mb1 fs-28 sm-fs-40'>Crime data API</h2>
          <h3 className='mt0 mb3 pb1 fs-18 sm-fs-28 border-bottom border-red-bright'>
            Use our data in your project
          </h3>
          <p className='mb3 sm-mb6 col-10 fs-18 sm-fs-24 serif'>
            We recently released the FBI’s first crime data
            <Term dispatch={dispatch} id='application programming interface (api)'>
              API
            </Term> so you can use this data in your own research and investigations.
          </p>
          <a
            className='btn btn-primary'
            href='https://crime-data-api.fr.cloud.gov/swagger-ui/'
          >
            See API documentation
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
