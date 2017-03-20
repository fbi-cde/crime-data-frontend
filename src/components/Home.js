/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'
import { Link } from 'react-router'

import LocationSelect from './LocationSelect'
import Term from './Term'
import UsaMap from './UsaMap'
import { updateApp } from '../actions/composite'
import { updateFilters } from '../actions/filters'
import { slugify } from '../util/text'
import stateLookup from '../util/usa'
import otherDataSets from '../../content/datasets.yml'


const Home = ({ appState, dispatch, location }) => {
  const { crime, place } = appState.filters
  const isValid = !!(crime && place) || false

  const handleMapClick = e => {
    const id = e.target.getAttribute('id')
    if (!id) return
    dispatch(updateFilters({ place: slugify(stateLookup(id)) }))
  }

  const handleSearchClick = () => {
    const change = { crime, place }
    dispatch(updateApp(change, location))
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
          <p className='mb1 md-col-10 fs-18 sm-fs-24 serif'>
            The FBI collects and publishes{' '}
            <Term
              dispatch={dispatch}
              id='uniform crime reporting (ucr) program'
            >
              Uniform Crime Reporting (UCR)
            </Term> data on an annual basis.
          </p>
          <p className='m0 md-col-10 fs-16 sm-fs-20 serif'>
            Over 18,000 law enforcement agencies across the country voluntarily
            participate in the program by submitting data through a state
            UCR program or directly to the FBI. This open data project is
            part of our ongoing efforts to improve the accuracy and timeliness
            of the nation’s crime statistics.
          </p>
        </div>
      </section>
      <section className='px2 bg-white'>
        <div className='py7 container mx-auto'>
          <h2 className='mt0 mb4 fs-22 sm-fs-32'>
            Explore by location and type of crime
          </h2>
          <div className='clearfix mxn2'>
            <div className='sm-col sm-col-4 px2 mb2 sm-m0'>
              <LocationSelect
                className='col-12 sm-fs-18 field select'
                onChange={selectLocation}
                selected={place}
              />
            </div>
            <div className='sm-col sm-col-4 px2 mb2 sm-m0'>
              <label htmlFor='crime-select' className='hide'>
                Choose a crime
              </label>
              <select
                className='col-12 sm-fs-18 field select'
                id='crime-select'
                onChange={selectCrime}
                defaultValue={crime || ''}
              >
                <option value='' disabled>Crime Type</option>
                <optgroup label='Violent Crime'>
                  <option value='violent-crime'>
                    All Violent Crime
                  </option>
                  <option value='homicide'>Homicide</option>
                  <option value='rape'>Rape</option>
                  <option value='robbery'>Robbery</option>
                  <option value='aggravated-assault'>Aggravated Assault</option>
                </optgroup>
                <optgroup label='Property Crime'>
                  <option value='property-crime'>
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
                className={`col-12 btn btn-primary ${isValid ? '' : 'hint-bottom'}`}
                aria-label={isValid ? '' : 'Please select a location and crime type'}
                disabled={!isValid}
                onClick={handleSearchClick}
              >
                View results
              </button>
            </div>
          </div>
          <div className='py4 sm-py7 sm-col-9 mx-auto'>
            <UsaMap mapClick={handleMapClick} place={place} />
          </div>
          <div className='mb7 sm-hide md-hide lg-hide'>
            <button
              className='btn btn-primary'
              disabled={!isValid}
              onClick={handleSearchClick}
            >
              View results
            </button>
          </div>
          <h2 className='mt0 mb3 fs-22 sm-fs-32'>Data downloads</h2>
          <div className='flex flex-wrap mxn2'>
            {otherDataSets.slice(0, 3).map((d, i) => (
              <div key={i} className='flex sm-col sm-col-6 md-col-4 px2 mb2 sm-mb4'>
                <div className='px3 py2 bg-blue-white'>
                  <div className='mb1 pb1 fs-ch2 bold border-bottom border-red-bright'>
                    {d.title}
                  </div>
                  <p className='mb2'>{d.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Link
              className='mb1 btn btn-primary btn-lg fs-18'
              to='/downloads-and-docs'
            >
              See all downloads
            </Link>
          </div>
        </div>
      </section>
      <section className='px2 bg-blue-white'>
        <div className='py7 container mx-auto'>
          <h2 className='mt0 mb1 fs-28 sm-fs-40'>Crime data API</h2>
          <h3 className='mt0 mb3 pb1 fs-18 sm-fs-28 border-bottom border-red-bright'>
            Use our data in your project
          </h3>
          <p className='mb3 sm-mb6 md-col-10 fs-18 sm-fs-24 serif'>
            We recently released the FBI’s first crime data{' '}
            <Term dispatch={dispatch} id='application programming interface (api)'>
              application programming interface (API)
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
