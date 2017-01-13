import React from 'react'

const AboutTheData = () => (
  <div>
    <h2 className='mb1'>About the data</h2>
    <div className='clearfix mxn2'>
      <div className='lg-col lg-col-7 px2'>
        <p>
          The FBI collects crime data through the <a className='navy bold' href='https://ucr.fbi.gov/'>Uniform Crime Reporting (UCR) Program</a>.
        </p>
        <h4>Change in rape definition</h4>
        <p>
          In 2013, the FBI started collecting rape data under a revised
          definition and removed “forcible” from the offense name. All
          reported rape incidents in Ohio—whether collected under the
          revised definition or the legacy definition—are presented here.
          Since the rape definition changed, some state and local law
          enforcement agencies have continued to report incidents with the
          legacy definition, because they haven’t been able to change their
          records management systems to accommodate the change.
        </p>
        <h4>How these crimes are counted</h4>
        <p>
          The Uniform Crime Reporting Program counts one offense for each
          victim of rape, attempted rape, or assault to commit rape, regardless
          of the victim’s age. Sexual relations involving a family member
          without consent are counted as rape, not incest. Statutory rape
          and incest are excluded.
        </p>
        <h4>Estimations</h4>
        <p>
          The national and state-level trends include estimates for agencies
          that submitted less than 12 months of data. The estimation process
          considers the population size covered by the agency; type of
          jurisdiction, such as a police department or sheriff’s office; and
          geographic location.
        </p>
      </div>
      <div className='lg-col lg-col-5 px2'>
        <div className='p2 sm-p3 bg-navy white'>
          <h3 className='mt0 mb2'>Further reading</h3>
          <ul className='list-style-none m0 p0'>
            <li className='mb1'><a href='https://ucr.fbi.gov/new-rape-fact-sheet'>Rape Definition Fact Sheet</a></li>
            <li className='mb1'><a href='https://ucr.fbi.gov/recent-program-updates/new-rape-definition-frequently-asked-questions'>FAQ About the Change in the UCR Definition of Rape</a></li>
            <li className='mb1'><a href='https://ucr.fbi.gov/nibrs/2013/resources/nibrs-rape-vs.-srs-rape'>NIBRS Rape vs. Summary Rape</a></li>
            <li className='mb1'><a href='https://www.bjs.gov/index.cfm?ty=tp&tid=317#pubs'>Bureau of Justice Statistics: Rape and Sexual Assault</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default AboutTheData
