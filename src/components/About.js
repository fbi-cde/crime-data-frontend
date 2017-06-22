import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import Term from './Term'
import UsaMap from './UsaMap'

import DownloadDataBtn from './DownloadDataBtn'
import { showFeedback } from '../actions/feedback'
import ucr from '../util/ucr'
import { slugify } from '../util/text'
import usa, { data as usaData, nationalKey } from '../util/usa'

const legend = [
  {
    check: (stateProgram, nibrs, srs) => stateProgram && !srs && nibrs,
    css: 'fill-blue',
    hex: '#324D5F',
    text: 'Incident data only',
  },
  {
    check: (stateProgram, nibrs, srs) => stateProgram && srs && nibrs,
    css: 'fill-blue-light',
    hex: '#95AABC',
    text: 'Incident and Summary data',
  },
  {
    check: (stateProgram, nibrs, srs) => stateProgram && srs && !nibrs,
    css: 'fill-blue-lighter',
    hex: '#DFE6ED',
    text: 'Summary data only',
  },
  {
    check: stateProgram => !stateProgram,
    css: 'fill-red-dark',
    hex: '#702c27',
    text: 'No state program',
  },
]

const stateColors = Object.keys(usaData)
  .filter(k => slugify(usa(k)) !== nationalKey)
  .map(k => {
    const stateName = usa(k)
    const ucrInfo = ucr(stateName)
    const { 'state-program': stateProgram, nibrs, srs } = ucrInfo
    const matches = legend.filter(l => l.check(stateProgram, nibrs, srs))

    return {
      state: k,
      color: matches[0].css,
    }
  })

const reduceStateColors = (accum, next) => ({
  ...accum,
  [next.state]: next.color,
})

const agenciesParticiaptionDownloadUrl =
  'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3/agencies.csv'

const About = ({ dispatch }) =>
  <div>
    <Helmet title="CDE :: About" />
    <section className="bg-white">
      <div className="px2 py7 container mx-auto">
        <h1 className="mt0 mb4 pb1 fs-28 sm-fs-40 border-bottom border-blue-light">
          About the Crime Data Explorer
        </h1>
        <div className="mb7 clearfix">
          <div className="md-col md-col-9 md-pr7 fs-18 sm-fs-24 serif">
            <p className="mb2 md-m0">
              The Crime Data Explorer makes nationwide crime data accessible for
              a wide range of users, including law enforcement professionals,
              journalists, and the general public. The tool allows you to view
              trends and download bulk data, to better understand reported crime
              at the national, state, and agency level.
            </p>
          </div>
          <div className="md-col md-col-3">
            <h3 className="mt-tiny mb2 fs-18 sm-fs-22">Available datasets</h3>
            <ul className="m0 p0 fs-14 sm-fs-16 left-bars">
              <li className="mb2">
                <Term id="Summary Reporting System (SRS)">
                  Summary Statistics (SRS)
                </Term>
              </li>
              <li className="mb2">
                <Term id="National Incident-Based Reporting System (NIBRS)">
                  Incident-based data
                </Term>
              </li>
              <li className="mb2">
                <Term id="Assaults on law enforcement officers">
                  Assaults on law enforcement officers
                </Term>
              </li>
              <li className="mb2">
                <Term id="Hate Crime">
                  Hate Crime
                </Term>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-blue-whiter">
      <div className="px2 py6 bg-lighten-1">
        <div className="container mx-auto">
          <h3 className="mt0 mb3 fs-22 sans-serif">
            Uniform Crime Reporting Participation, 2014
          </h3>
          <div className="mb4 clearfix table">
            <div className="md-col md-col-9 md-pr7">
              <UsaMap
                colors={stateColors.reduce(reduceStateColors, {})}
                changeColorOnHover={false}
              />
            </div>
            <div className="md-col md-col-3 pt1 relative table-cell">
              <div className="">
                {legend
                  .map(d => ({
                    ...d,
                    count: stateColors.filter(s => s.color === d.css).length,
                  }))
                  .map((d, i) =>
                    <div key={i} className="flex mt2 fs-14">
                      <div
                        className="flex-none mt-tiny mr1 circle"
                        style={{
                          width: 16,
                          height: 16,
                          backgroundColor: d.hex,
                        }}
                      />
                      <div className="flex-auto">
                        <div className="bold monospace">
                          {`${d.count} State${d.count !== 1 ? 's' : ''}`}
                        </div>
                        <div>{d.text}</div>
                      </div>
                    </div>,
                  )}
              </div>
              <div className="border-top bottom-0 fs-14 pt1 mt2">
                To see which agencies submit NIBRS data to the FBI, download
                <DownloadDataBtn
                  className="fs-14"
                  data={[{ url: agenciesParticiaptionDownloadUrl }]}
                  text="Agency participation data"
                />
              </div>
            </div>
          </div>
          <div className="fs-12 serif italic">
            Other outlying areas include America Samoa, Guam, Puerto Rico, and
            U.S. Virgin Islands.
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white">
      <div className="px2 py7 container mx-auto">
        <h2 className="mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light">
          Crime data
        </h2>
        <div className="clearfix">
          <div className="md-col md-col-9 md-pr7 fs-16 sm-fs-18 serif">
            <p className="mb3">
              The FBI’s Uniform Crime Reporting (UCR) Program is made up of two
              types of reports voluntarily submitted by law enforcement agencies
              across the country. Agencies participate in the UCR Program by
              submitting data to the FBI in one of two formats: summary
              statistics (SRS) or incident-based reports (NIBRS). The Crime Data
              Explorer makes both types of data available through the API and
              bulk downloads.
            </p>
            <div className="bold">
              Summary (SRS) data
              <span className="italic ml-tiny regular">
                1960-2014 data available
              </span>
            </div>
            <p className="mb3">
              This data is made up of the number of offenses that occurred. It
              captures only the most serious offense involved in crime incidents
              according to the hierarchy rule plus a few supplemental details
              depending on the offense. For example, victim and offender data
              are collected only for murder offenses. Summary data allows us to
              show crime rates as trends and as totals.
            </p>
            <div className="bold">
              Incident-based (NIBRS) data
              <span className="italic ml-tiny regular">
                1991-2014 data available
              </span>
            </div>
            <p className="mb3 md-m0">
              Incident-based (NIBRS) data records all major offenses that were
              part of an incident and captures details about each incident such
              as information about the the victim, the offender, the property
              involved, and the arrestees, providing context that is not
              provided by the summary data. Incident-based data allow us to
              visualize how crime breaks down regarding victims, offenders, and
              other attributes related to a reported crime.{' '}
            </p>
          </div>
          <div className="md-col md-col-3">
            <h3 className="mt-tiny mb2 fs-18 sm-fs-22">
              UCR Program Resources
            </h3>
            <ul className="m0 p0 fs-14 sm-fs-16 left-bars">
              <li className="mb1">
                <a href="https://ucr.fbi.gov/">UCR Home</a>
              </li>
              <li className="mb1">
                <a href="https://ucr.fbi.gov/new-ucr-project">New UCR</a>
              </li>
              <li className="mb1">
                <a href="https://ucr.fbi.gov/nibrs/nibrs-user-manual">
                  NIBRS user manual
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-blue white">
      <div className="px2 py7 container mx-auto">
        <h2 className="mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-red-bright">
          More to come
        </h2>
        <div className="mb3 md-pr7 border-box serif">
          <p className="mb3 fs-18 sm-fs-24">
            This project is part of an ongoing effort to improve and provide
            access to the nation’s crime statistics. We’re working to add new
            features and an data based on your feedback. Tell us what you’d like
            to see next.
          </p>
        </div>
        <button
          className="btn btn-primary bg-white blue"
          onClick={() => dispatch(showFeedback())}
          type="button"
        >
          Submit feedback
        </button>
      </div>
    </section>
    <section className="bg-white">
      <div className="px2 py7 container mx-auto">
        <h2 className="mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light">
          Contact us
        </h2>
        <div className="clearfix mxn6 mb3">
          <div className="md-col md-col-4 px6 mb4 md-mb0">
            <h3 className="mt0 mb2 fs-22 sans-serif red">Data questions?</h3>
            <p className="m0">
              <strong>FBI Uniform Crime<br />Reporting Program</strong><br />
              1000 Custer Hollow Road<br />
              Clarksburg, WV 26306
            </p>
          </div>
          <div className="md-col md-col-4 px6 mb4 md-mb0">
            <h3 className="mt0 mb2 fs-22 sans-serif red">
              UCR Data Submissions
            </h3>
            <p className="m0">
              All UCR data submissions must be sent to this e-mail address.
            </p>
            <p>
              E-mail:{' '}
              <a className="underline" href="mailto:ucrstat@leo.gov">
                ucrstat@leo.gov
              </a>
            </p>
          </div>
          <div className="md-col md-col-4 px6 md-pl8 mb4 md-mb0">
            <h3 className="mt0 mb2 fs-22 sans-serif red">
              UCR Program Contacts
            </h3>
            <p className="m0">
              View additional{' '}
              <a
                className="underline"
                href="https://ucr.fbi.gov/ucr-program-contacts"
              >
                contacts
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>

About.propTypes = {
  dispatch: PropTypes.func,
}

export default About
