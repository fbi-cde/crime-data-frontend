import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import reduceEntries from 'reduce-entries'
import { bindActionCreators } from 'redux'

import SharingTags from '../components/SharingTags'
import Term from '../components/Term'
import UsaMap from '../components/UsaMap'

import DownloadDataBtn from '../components/DownloadDataBtn'
import { showFeedback } from '../actions/feedback'
import participation from '../util/participation'
import { data as usaData, nationalKey } from '../util/usa'

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

const stateColors = usaData.filter(k => k.slug !== nationalKey).map(k => {
  const ucrInfo = participation(k.slug)
  const { 'state-program': stateProgram, nibrs, srs } = ucrInfo
  const matches = legend.filter(l => l.check(stateProgram, nibrs, srs))

  return {
    color: matches[0].css,
    display: k.display,
    key: k.id,
    program: matches[0].text,
  }
})

class About extends React.Component {
  state = { mapShown: true }

  componentDidUpdate(prevProps, prevState) {
    const { mapShown } = this.state
    const otherType = mapShown ? 'table' : 'map'
    if (mapShown !== prevState.mapShown) {
      const other = this.els.find(el => el.type === otherType)
      if (other) other.el.focus()
    }
  }

  els = []

  handleClick = e => {
    const { id } = e.target
    switch (id) {
      case 'btn-toggle-map':
        this.setState({ mapShown: true })
        break
      case 'btn-toggle-table':
        this.setState({ mapShown: false })
        break
      default:
        break
    }
  }

  render() {
    const { mapShown } = this.state
    const toggles = [
      { disabled: !mapShown, type: 'table' },
      { disabled: mapShown, type: 'map' },
    ]
    return (
      <div>
        <Helmet title="CDE :: About" />
        <SharingTags title="About" />
        <section className="bg-white">
          <div className="px2 py7 container mx-auto">
            <h1 className="mt0 mb4 pb1 fs-28 sm-fs-40 border-bottom border-blue-light">
              About the Crime Data Explorer
            </h1>
            <div className="clearfix">
              <div className="md-col md-col-9 md-pr7 fs-16 sm-fs-20 serif">
                <p className="mb2 md-m0">
                  The Crime Data Explorer is part of the FBI’s broader effort to
                  modernize the reporting of national crime data. It allows you
                  to{' '}
                  <a href="explorer/violent-crime" className="underline">
                    view trends
                  </a>,{' '}
                  <a href="/downloads-and-docs" className="underline">
                    download bulk data
                  </a>, and access the{' '}
                  <a href="/api" className="underline">
                    Crime Data API
                  </a>{' '}
                  for reported crime at the national, state, and agency levels.
                </p>
              </div>
              <div className="md-col md-col-3">
                <h2 className="mt-tiny mb2 fs-18 sm-fs-22">Available data</h2>
                <ul className="m0 p0 fs-14 sm-fs-16 left-bars">
                  <li className="mb2">
                    <Link to="/downloads-and-docs">Bulk data downloads</Link>
                  </li>
                  <li className="mb2">
                    <a href="/api">Crime data API</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-blue-whiter">
          <div className="px2 py6 bg-lighten-1">
            <div className="container mx-auto">
              <div className="border-bottom border-blue-light clearfix mt0 mb5 pb1">
                <h2 className="fs-22 sm-fs-32 col col-12 md-col-6 mt0">
                  How states participate
                </h2>
                <div className="fs-12 col col-12 md-col-6">
                  {toggles.map(b =>
                    <button
                      aria-controls="us-ucr-participation"
                      className={`btn col-6 md-col-4 right ${b.disabled
                        ? 'regular'
                        : ''}`}
                      id={`btn-toggle-${b.type}`}
                      key={b.type}
                      onClick={this.handleClick}
                      disabled={b.disabled}
                      ref={el => {
                        if (this.els.length >= toggles.length) return
                        this.els.push({ ...b, el })
                      }}
                    >
                      View as {b.type}
                    </button>,
                  )}
                </div>
              </div>
              <div className="mb4 clearfix" id="us-ucr-participation">
                {mapShown
                  ? <ParticipationMap states={stateColors} />
                  : <ParticipationTable states={stateColors} />}
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
              <div className="md-col md-col-9 md-pr7 fs-16 sm-fs-20 serif">
                <p className="mb3">
                  Since 1930, participating local, county, state, tribal, and
                  federal law enforcement agencies have voluntarily provided the
                  nation with crime statistics through the{' '}
                  <a href="https://ucr.fbi.gov/" className="underline">
                    Uniform Crime Reporting (UCR) Program
                  </a>{' '}
                  via:
                </p>
                <div className="mb-tiny bold">
                  Summary (SRS) data
                  <span className="italic ml-tiny regular">
                    1960—2016 data available
                  </span>
                </div>
                <p className="mb3">
                  Summary data allows us to show crime rates as trends and
                  totals. This data includes the number of offenses that were
                  reported on a state or agency level. It captures the most
                  serious offense involved in crime incidents according to the{' '}
                  <Term id="hierarchy rule">hierarchy rule</Term> and
                  supplemental details depending on the offense. For example,
                  victim and offender data are collected only for murder
                  offenses.
                </p>
                <div className="mb-tiny bold">
                  Incident-based (NIBRS) data
                  <span className="italic ml-tiny regular">
                    1991—2016 data available
                  </span>
                </div>
                <p>
                  Incident-based data allow us to visualize how crime breaks
                  down regarding victims, offenders, and other attributes
                  related to a reported crime. NIBRS data records details
                  regarding individual offenses and arrests that were part of an
                  incident, such as information about the victim, offender,
                  property involved, and arrestees, providing context that is
                  not provided by the summary data.
                </p>
                <p>
                  The Crime Data Explorer makes this data available through the{' '}
                  <a href="/api" className="underline">
                    API
                  </a>{' '}
                  and{' '}
                  <a href="/downloads-and-docs" className="underline">
                    bulk downloads
                  </a>.
                </p>
                <p>
                  The Crime Data provided from{' '}
                  <a href="https://ucr.fbi.gov/" className="underline">
                      Uniform Crime Reporting (UCR) Program
                    </a>{' '}
                  for 2016 was made available on 9/25/2017.
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
                    <a href="https://ucr.fbi.gov/new-ucr-project">
                      New UCR Project
                    </a>
                  </li>
                  <li className="mb1">
                    <a href="https://ucr.fbi.gov/nibrs/nibrs-user-manual">
                      NIBRS User Manual
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-blue-whiter">
          <div className="px2 py7 container mx-auto">
            <h2 className="mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light">
              More to come
            </h2>
            <div className="mb3 md-pr7 border-box serif">
              <p className="mb3 fs-16 sm-fs-20 md-col-9">
                The Crime Data Explorer is part of an ongoing effort to improve
                and provide access to the nation’s crime statistics. We’re
                working to add new features and value your feedback. Tell us
                what you’d like to see next.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

About.propTypes = {
  actions: PropTypes.shape({
    showFeedback: PropTypes.func,
  }),
}

const ParticipationMap = ({ states }) =>
  <div>
    <div className="md-col md-col-9 md-pr7">
      <UsaMap
        colors={states.reduce(reduceEntries('color'), {})}
        changeColorOnHover={false}
      />
    </div>
    <div className="md-col md-col-3 pt1 relative table-cell">
      <div className="">
        {legend
          .map(d => ({
            ...d,
            count: states.filter(s => s.color === d.css).length,
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
                <div>
                  {d.text}
                </div>
              </div>
            </div>,
          )}
      </div>
      <div className="mt6 pt2 fs-14 border-top border-blue-light">
        To see which agencies submit NIBRS data to the FBI, download
        <DownloadDataBtn
          data={[
            {
              url:
                'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3/agencies.csv',
            },
          ]}
          text="Agency participation data"
        />
      </div>
    </div>
    <div className="md-col-8 fs-12 serif italic">
      Territories including American Samoa, Puerto Rico, Guam, and the U.S.
      Virgin Islands submit summary data to the FBI. Some agencies submit data
      directly to the FBI.
    </div>
  </div>

const ParticipationTable = ({ states }) =>
  <table className="table-striped-white">
    <thead>
      <tr className="lh-32">
        <th className="align-top pl1">State</th>
        <th>Data type submitted to the FBI</th>
      </tr>
    </thead>
    <tbody>
      {states.map((s, i) =>
        <tr className="lh-32" key={i}>
          <td className="pl1">
            {s.display}
          </td>
          <td>
            {s.program}
          </td>
        </tr>,
      )}
    </tbody>
  </table>

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ showFeedback }, dispatch),
})

export default connect(null, mapDispatchToProps)(About)
