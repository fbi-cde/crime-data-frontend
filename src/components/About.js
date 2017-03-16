import React from 'react'

import UsaMap from './UsaMap'

import ucr from '../util/ucr'
import usa, { data as usaData } from '../util/usa'


const colorFromUcr = info => {
  if (info.srs && !info.nibrs) return 'fill-blue-lighter'
  else if (!info.srs && info.nibrs) return 'fill-blue'
  else if (info.srs && info.nibrs) return 'fill-blue-light'
  return 'fill-red-bright'
}

const stateColors = Object.keys(usaData).map(k => {
  const stateName = usa(k)
  const ucrInfo = ucr(stateName)
  return {
    state: k,
    color: colorFromUcr(ucrInfo),
  }
}).reduce((accum, next) => ({
  ...accum,
  [next.state]: next.color,
}), {})

const colorCounts = Object.keys(stateColors)
  .map(c => stateColors[c])
  .reduce((accum, next) => {
    const count = accum[next]
    if (count >= 0) return { ...accum, [next]: count + 1 }
    return { ...accum, [next]: 0 }
  }, {})

const legend = [
  { count: colorCounts['fill-blue'], color: '#324D5F', text: 'Incident data only' },
  { count: colorCounts['fill-blue-light'], color: '#95AABC', text: 'Incident and Summary data' },
  { count: colorCounts['fill-blue-lighter'], color: '#DFE6ED', text: 'Summary data only' },
]

const About = () => (
  <div>
    <section className='bg-white'>
      <div className='px2 py7 container mx-auto'>
        <h1 className='mt0 mb4 pb1 fs-28 sm-fs-40 border-bottom border-blue-light'>
          About the Crime Data Explorer
        </h1>
        <div className='mb7 clearfix'>
          <div className='md-col md-col-9 md-pr7 fs-18 sm-fs-24 serif'>
            <p className='mb2 md-m0'>
              The Crime Data Explorer publishes nation-wide crime data collected
              by the FBI in a digital format. The tool allows you to view
              trends and download bulk data allowing you to get a better
              understanding of crime across the country.
            </p>
          </div>
          <div className='md-col md-col-3'>
            <h3 className='mt-tiny mb2 fs-18 sm-fs-22'>Available datasets</h3>
            <ul className='m0 p0 fs-14 sm-fs-16 left-bars'>
              <li className='mb2'>
                <a className='border-bottom-dashed' href='#!'>Summary Statistics (SRS)</a>
              </li>
              <li className='mb2'>
                <a className='border-bottom-dashed' href='#!'>Incident-based data</a>
              </li>
              <li className='mb2'>
                <a className='border-bottom-dashed' href='#!'>Hate Crime</a>
              </li>
            </ul>
          </div>
        </div>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light'>
          Crime data
        </h2>
        <div className='clearfix'>
          <div className='md-col md-col-9 md-pr7 fs-16 sm-fs-18 serif'>
            <p className='mb3'>
              The data available from the FBI’s Uniform Crime Reporting program (UCR)
              is made up of reports from police agencies across the country. Police
              agencies submit data to the FBI in one of two formats: summary statistics
              (SRS) or incident-based reports (NIBRS). The Crime Data Explorer makes both
              types of data available and displays them separately. SRS data is available
              for the years 1960 to 2014. Incident-based data began being collected much
              more recently and is available here from 1991-2014.
            </p>
            <div className='bold'>Summary (SRS) data</div>
            <p className='mb3'>
              Summary data is made up of counts of each type of crime.
            </p>
            <div className='bold'>Incident-based (NIBRS) data</div>
            <p className='mb3 md-m0'>
              Incident-based (NIBRS) data captures details on each single crime
              incident, providing context that is left out of the summary data.
            </p>
          </div>
          <div className='md-col md-col-3'>
            <h3 className='mt-tiny mb2 fs-18 sm-fs-22'>UCR Resources</h3>
            <ul className='m0 p0 fs-14 sm-fs-16 left-bars'>
              <li className='mb1'>
                <a href='#!'>UCR Home</a>
              </li>
              <li className='mb1'>
                <a href='#!'>New UCR</a>
              </li>
              <li className='mb1'>
                <a href='#!'>Publications and reports</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className='bg-blue-whiter'>
      <div className='px2 py6 bg-lighten-1'>
        <div className='container mx-auto'>
          <h3 className='mt0 mb3 fs-22 sans-serif'>
            Uniform Crime Reporting Participation, 2014
          </h3>
          <div className='mb4 clearfix'>
            <div className='md-col md-col-9 md-pr7'>
              <UsaMap colors={stateColors} changeColorOnHover={false} />
            </div>
            <div className='md-col md-col-3 pt1'>
              {legend.map((d, i) => (
                <div key={i} className='flex mt2 fs-14'>
                  <div
                    className='flex-none mt-tiny mr1 circle'
                    style={{ width: 16, height: 16, backgroundColor: d.color }}
                  />
                  <div className='flex-auto'>
                    <div className='bold monospace'>
                      {`${d.count} State${d.count !== 1 ? 's' : ''}`}
                    </div>
                    <div>{d.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='fs-12 serif italic'>
            U.S. territories are not included in the map
          </div>
        </div>
      </div>
    </section>
    <section className='bg-blue white'>
      <div className='px2 py7 container mx-auto'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-red-bright'>
          More to come
        </h2>
        <div className='mb3 md-col-9 md-pr7 serif'>
          <p className='mb3 fs-18 sm-fs-24'>
            This project is part of an ongoing effort to improve and promote
            transparency behind the nation’s crime statistics. We’re working
            to add more datasets to this tool, and we’re continuing to
            develop new features based on your feedback.
          </p>
          <p className='fs-16 sm-fs-18'>
            Future versions will include more granular perspectives of the data
            and more customizable features.
          </p>
          <p className='fs-16 sm-fs-18'>
            We’d love to hear what you think about the Crime Data Explorer.
          </p>
        </div>
        <button className='btn btn-primary bg-white blue' type='button'>
          Submit feedback
        </button>
      </div>
    </section>
    <section className='bg-white'>
      <div className='px2 py6 container mx-auto'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light'>
          Contact us
        </h2>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-4 px2 mb4 sm-mb0'>
            <h3 className='mt0 mb2 fs-22 sans-serif red'>Data questions?</h3>
            <p className='m0'>
            Please direct questions about the data to:
            Criminal Justice Information Services (CJIS) Division
            cjis_comm@leo.gov
            (304) 625-4995
            Federal Bureau of Investigation
            Uniform Crime Reporting Program
            1000 Custer Hollow Road
            Clarksburg, WV 26306
            </p>
          </div>
          <div className='sm-col sm-col-4 px2 mb4 sm-mb0'>
            <h3 className='mt0 mb2 fs-22 sans-serif red'>Technical issues?</h3>
            <p className='m0'>
              Please submit technical questions about the application and the API
              via <a href='https://github.com/18F/crime-data-explorer'>GitHub</a>
            </p>
          </div>
          <div className='sm-col sm-col-4 px2 mb4 sm-mb0'>
            <h3 className='mt0 mb2 fs-22 sans-serif red'>Follow us</h3>
            <p className='m0'>
              <a className='block' href='https://twitter.com/FBI'>Twitter</a>
              <a className='block' href='https://github.com/18F/crime-data-explorer'>GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default About
