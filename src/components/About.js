import React from 'react'

import UsaMap from './UsaMap'

const legend = [
  { count: 16, color: '#324D5F', text: 'Incident data only' },
  { count: 18, color: '#95AABC', text: 'Incident and Summary data' },
  { count: 14, color: '#DFE6ED', text: 'Summary data only' },
  { count: 1, color: '#F48E88', text: 'Establishing an incident data only program' },
  { count: 1, color: '#FF5E50', text: 'Currently no UCR program' },
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
            The Crime Data Explorer makes the nation’s crime data accessible to
            the public by providing dynamic views of the data as well bulk
            data downloads.
          </p>
          <p>
            CDE in Beta: This is a paragprah about this site currently being
            an MVP, and there will be more features to come, etc. Law
            enforcement agencies report crime data to the FBI using two
            different mechanisms: summary statistics and incident-based
            data reports.
          </p>
          <p>
            The data featured comes from the Uniform Crime Reporting
            (UCR) program, which is managed by the Federal Bureau
            of Investigation.
          </p>
        </div>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light'>
          Crime Data
        </h2>
        <p className='mb4 fs-18 sm-fs-24 serif'>
          Law enforcement agencies report crime data to the FBI using
          two different mechanisms: summary statistics and incident-based
          data reports. The goal is for every law enforcement agency to
          eventually begin reporting incident-based data reports.
        </p>
        <div className='flex flex-wrap mxn1 mb5'>
          <div className='flex sm-col sm-col-6 px1 mb2'>
            <div className='p2 sm-p3 bg-blue-white'>
              <h3 className='mt0 mb1 pb-tiny fs-22 sans-serif border-bottom border-red-bright'>
                Summary Data (SRS)
              </h3>
              <p className='m0'>
                Use our application programming interface (API) to
                search and export Uniform Crime Reporting (UCR) data. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className='sm-col sm-col-6 px1 mb2'>
            <div className='p2 sm-p3 bg-blue-white'>
              <h3 className='mt0 mb1 pb-tiny fs-22 sans-serif border-bottom border-red-bright'>
                Incident-Based Data (NIBRS)
              </h3>
              <p className='m0'>
                Use our application programming interface (API) to search
                and export Uniform Crime Reporting (UCR) data. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
        <h3 className='mt0 mb4 fs-22 sans-serif'>
          Uniform Crime Reporting Participation, 2014
        </h3>
        <div className='clearfix mxn2'>
          <div className='sm-col sm-col-9 px2'>
            <UsaMap />
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
          <a className='fs-14 bold blue' href='#!'>Download UCR Participation Data</a>
        </div>
      </div>
    </section>
    <section className='px2 bg-blue-white'>
      <div className='py7 container mx-auto'>
        <div className='clearfix mxn2'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='sm-col sm-col-4 px2 mb4 sm-mb0'>
              <h3 className='mt0 mb2 fs-22 sans-serif'>New UCR</h3>
              <p className='mb2 sm-mb4'>
                The New UCR will improve the accuracy and timeliness of
                the crime data collection and delivery process. The national
                UCR Program plans to have the new system fully operational
                in 2017.
              </p>
              <button className='btn btn-primary btn-sm fs-14'>
                View details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className='px2 bg-blue white'>
      <div className='py7 container mx-auto'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-red-bright'>
          What to Expect
        </h2>
        <p className='mb4 fs-18 sm-fs-24 serif'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </p>
        <button className='btn btn-primary bg-white blue' type='button'>
          Give Us Feedback
        </button>
      </div>
    </section>
    <section className='px2 bg-white'>
      <div className='py7 container mx-auto'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-light'>
          Contact Us
        </h2>
        <div className='clearfix mxn2'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='sm-col sm-col-4 px2 mb4 sm-mb0'>
              <h3 className='mt0 mb2 fs-22 sans-serif red'>Data Questions?</h3>
              <p className='m0'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
)

export default About
