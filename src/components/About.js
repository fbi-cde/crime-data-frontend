/* eslint max-len: 0 */

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
  // { count: 1, color: '#F48E88', text: 'Establishing an incident data only program' },
  // { count: 1, color: '#FF5E50', text: 'Currently no UCR program' },
]

const About = () => (
  <div>
    <section className='px2 bg-white'>
      <div className='py7 container mx-auto'>
        <h1 className='mt0 mb4 pb1 fs-28 sm-fs-40 border-bottom border-blue-light'>
          About the Crime Data Explorer
        </h1>
        <div className='mb7 md-col-10 fs-18 sm-fs-24 serif'>
          <p>
            The Crime Data Explorer publishes nation-wide crime data collected by the FBI in a digital format. The tool allows you to view trends and download bulk data allowing you to get a better understanding of crime across the country.
          </p>
        </div>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light'>
          Crime data
        </h2>
        <p className='mb4 fs-18 sm-fs-24 serif'>
          The data available here is from the FBI’s Uniform Crime Reporting program (UCR), which is made up of reports from law enforcement agencies across the country. The tool features general crime data, data specific to hate crimes, and data about police officers killed or hurt while on duty. The crime reports are submitted to the FBI in two different formats: summary statistics and incident-based reports. Generally, police departments submit one or the other. The Crime Data Explorer displays both datasets separately and attempts to draw out nuances or data caveats that could affect data analysis.
        </p>
        <div className='flex flex-wrap mxn1 mb5'>
          <div className='flex sm-col sm-col-6 px1 mb2'>
            <div className='p2 sm-p3 bg-blue-white'>
              <h3 className='mt0 mb1 pb-tiny fs-22 sans-serif border-bottom border-red-bright'>
                Summary (SRS) data
              </h3>
              <p className='m0'>
                Summary data is made up of counts of each type of crime.
              </p>
            </div>
          </div>
          <div className='sm-col sm-col-6 px1 mb2'>
            <div className='p2 sm-p3 bg-blue-white'>
              <h3 className='mt0 mb1 pb-tiny fs-22 sans-serif border-bottom border-red-bright'>
                Incident-based (NIBRS) data
              </h3>
              <p className='m0'>
                Incident-based (NIBRS) data captures details
                on each single crime incident, providing context that
                is left out of the summary data.

              </p>
            </div>
          </div>
        </div>
        <h3 className='mt0 mb4 fs-22 sans-serif'>
          Uniform Crime Reporting Participation, 2014
        </h3>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-9 px2'>
            <UsaMap colors={stateColors} />
          </div>
          <div className='sm-col sm-col-3 px2 pt1'>
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
        <div className='mt4'>
          <a className='fs-14 bold blue' href='#!'>The map displays the type of data reported by each state. The goal is to have every state reporting NIBRS data by 2020.</a>
        </div>
      </div>
    </section>
    <section className='px2 bg-blue-white'>
      <div className='py7 container mx-auto'>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-4 px2 mb4 sm-mb0'>
            <h3 className='mt0 mb2 fs-22 sans-serif'>About the Uniform Crime Reporting (UCR) Program</h3>
            <p className='mb2 sm-mb4'>
          <ul>
            <li><a href="https://ucr.fbi.gov/">UCR Home</a></li>
            <li><a href="https://ucr.fbi.gov/new-ucr-project">New UCR</a></li>
         </ul>
             </p>
          </div>
          <div className='sm-col sm-col-4 px2 mb4 sm-mb0'>
            <h3 className='mt0 mb2 fs-22 sans-serif'>UCR documentation</h3>
            <p className='mb2 sm-mb4'>
            <ul>
              <li>a href="https://ucr.fbi.gov/ucr-publications">Publications and reports</a></li>
              <li><a href="https://ucr.fbi.gov/new-ucr-project">NIBRS documentation</a></li>
              <li>a href="https://ucr.fbi.gov/ucr-publications">SRS documentation</a></li>
              <li><a href="https://ucr.fbi.gov/hate-crime-technical-specification-version-1.1-pdf">Hate Crime documentation</a></li>
              <li><a href="https://ucr.fbi.gov/ucr-program-data-collections#Summary">LEOKA documentation</a></li>
           </ul>
            </p>
    </section>
    <section className='px2 bg-blue white'>
      <div className='py7 container mx-auto'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-red-bright'>
          More to come
        </h2>
        <p>
          This project is part of an ongoing effort to improve and promote transparency behind the nation’s crime statistics. We’re working on adding more datasets to this tool, and we’re continuing to develop new features based on your feedback.
        </p>
        <p>
          Future versions will include:
        </p>
        <ul>
          <li>More granular perspectives of the data </li>
          <li>More customizable data features</li>
          <li>Updates to the data</li>
          <li>New data types</li>
        </ul>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-red-bright'>
          Submit your feedback
        </h2>
        <p>
          We’d love to hear what you think about the Crime Data Explorer. Help us improve the quality of the data and let us know what other features would be useful to you.
        </p>
        <button className='btn btn-primary bg-white blue' type='button'>
          Submit feedback
        </button>
      </div>
    </section>
    <section className='px2 bg-white'>
      <div className='py7 container mx-auto'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light'>
          Contact us
        </h2>
        <div className='clearfix mxn2'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='sm-col sm-col-4 px2 mb4 sm-mb0'>
              <h3 className='mt0 mb2 fs-22 sans-serif red'>Data and technical questions</h3>
              <p className='m0'>
                For questions about the data please contact the Criminal Justice Information Services (CJIS) Division of the FBI.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
)

export default About
