/* eslint jsx-a11y/no-static-element-interactions: 0 */
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import LocationSelect from '../components/LocationSelect'
import SharingTags from '../components/SharingTags'
import UsaMap from '../components/UsaMap'
import { updateApp } from '../actions/composite'
import { updateFilters } from '../actions/filters'
import { oriToState } from '../util/agencies'
import { crimeTypes } from '../util/offenses'
import { slugify } from '../util/text'
import lookup from '../util/usa'
import dataPreview from '../../content/preview.yml'

const Home = ({ actions, crime, place, placeType, router }) => {
  const isValid = !!(crime && place) || false
  const usState = placeType === 'agency' ? oriToState(place) : place

  const handleMapClick = e => {
    const id = e.target.getAttribute('id')
    if (!id) return

    const placeNew = { place: lookup(id).slug, placeType: 'state' }
    actions.updateFilters(placeNew)
    actions.updateApp({ crime, ...placeNew }, router)
  }

  const handleSearchClick = () => {
    const change = { crime, place: usState, placeType: 'state' }
    actions.updateApp(change, router)
  }

  const selectCrime = e => {
    actions.updateFilters({ crime: slugify(e.target.value) })
  }

  const selectLocation = e => {
    actions.updateFilters(e)
  }

  return (
    <div>
      <Helmet title="CDE :: Home" />
      <SharingTags />
      <section className="px2 bg-blue-white">
        <div className="py7 container mx-auto relative">
          <h1 className="mt0 mb4 pb1 fs-28 sm-fs-40 border-bottom border-blue-light">
            Improving access to crime data
          </h1>
          <p className="mb1 md-col-9 fs-16 sm-fs-20 serif">
            The Crime Data Explorer makes nationwide crime data accessible to a
            wide range of users.{' '}
            <Link to="/explorer/violent-crime" className="underline">
              View trends
            </Link>,{' '}
            <Link to="/downloads-and-docs" className="underline">
              download bulk datasets
            </Link>, and access the{' '}
            <a href="/api" className="underline">
              Crime Data API
            </a>{' '}
            for reported crime at the national, state, and agency levels.
          </p>
        </div>
      </section>
      <section className="px2 bg-white">
        <div className="py7 container mx-auto">
          <h2 className="mt0 mb4 fs-22 sm-fs-32">
            Explore by location and type of crime
          </h2>
          <div className="clearfix mxn2">
            <div className="sm-col sm-col-4 px2 mb2 sm-m0">
              <LocationSelect
                className="col-12 sm-fs-18 field select"
                onChange={selectLocation}
                selected={usState}
              />
            </div>
            <div className="sm-col sm-col-4 px2 mb2 sm-m0">
              <label htmlFor="crime-select" className="hide">
                Choose a crime
              </label>
              <select
                className="col-12 sm-fs-18 field select"
                id="crime-select"
                onChange={selectCrime}
                defaultValue={crime || ''}
              >
                <option value="" disabled>
                  Crime Type
                </option>
                <optgroup label="Violent Crime">
                  {crimeTypes.violentCrime.map((o, i) =>
                    <option key={i} value={o.id || slugify(o)}>
                      {o.text || o}
                    </option>,
                  )}
                </optgroup>
                <optgroup label="Property Crime">
                  {crimeTypes.propertyCrime.map((o, i) =>
                    <option key={i} value={o.id || slugify(o)}>
                      {o.text || o}
                    </option>,
                  )}
                </optgroup>
              </select>
            </div>
            <div className="sm-col sm-col-4 px2 mb2 sm-m0 xs-hide">
              <button
                className={`col-12 btn btn-primary ${isValid
                  ? ''
                  : 'hint-bottom'}`}
                aria-label={
                  isValid ? '' : 'Please select a location and crime type'
                }
                disabled={!isValid}
                onClick={handleSearchClick}
              >
                View results
              </button>
            </div>
          </div>
          <div className="py4 sm-py7 sm-col-9 mx-auto">
            <UsaMap mapClick={handleMapClick} place={usState} />
          </div>
          <div className="mb7 sm-hide md-hide lg-hide">
            <button
              className="btn btn-primary"
              disabled={!isValid}
              onClick={handleSearchClick}
            >
              View results
            </button>
          </div>
          <h2 className="mt0 mb3 fs-22 sm-fs-32">
            Use our data in your project
          </h2>
          <div className="flex flex-wrap mxn2">
            {dataPreview.map((d, i) =>
              <div
                key={i}
                className="flex col col-12 sm-col-6 md-col-4 px2 mb2 sm-mb4"
              >
                <div className="col-12 px3 py2 bg-blue-white">
                  <div className="mb1 pb-tiny bold border-bottom border-blue-light">
                    {d.title}
                  </div>
                  <p className="mb2">
                    {d.description}
                  </p>
                </div>
              </div>,
            )}
          </div>
          <div>
            <Link
              className="mb1 btn btn-primary btn-lg"
              to="/downloads-and-docs"
            >
              See all downloads
            </Link>
          </div>
        </div>
      </section>
      <section className="px2 bg-blue-white">
        <div className="py7 container mx-auto">
          <h2 className="mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light">
            Open data
          </h2>
          <p className="p0 md-col-9 fs-16 sm-fs-20 serif">
            The data is voluntarily submitted by as many as 18,000 law
            enforcement agencies across the country that participate in the
            FBI’s{' '}
            <a href="https://ucr.fbi.gov/" className="underline">
              Uniform Crime Reporting (UCR) Program
            </a>. This is an open data project to improve the nation’s crime
            data and promote transparency in the criminal justice system.
          </p>
        </div>
      </section>
    </div>
  )
}

Home.propTypes = {
  actions: PropTypes.shape({
    updateApp: PropTypes.func,
    updateFilters: PropTypes.func,
  }),
  crime: PropTypes.string,
  place: PropTypes.string,
  placeType: PropTypes.string,
}

const mapStateToProps = ({ filters }) => ({ ...filters })
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateApp, updateFilters }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
