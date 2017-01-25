import React from 'react'

const links = [
  [
    'https://ucr.fbi.gov/new-rape-fact-sheet',
    'Rape Definition Fact Sheet',
  ],
  [
    'https://ucr.fbi.gov/recent-program-updates/new-rape-definition-frequently-asked-questions',
    'FAQ About the Change in the UCR Definition of Rape',
  ],
  [
    'https://ucr.fbi.gov/nibrs/2013/resources/nibrs-rape-vs.-srs-rape',
    'NIBRS Rape vs. Summary Rape',
  ],
  [
    'https://www.bjs.gov/index.cfm?ty=tp&tid=317#pubs',
    'Bureau of Justice Statistics: Rape and Sexual Assault',
  ],
]

const AboutTheData = () => (
  <div>
    <h2 className='mb1'>About the data</h2>
    <div className='clearfix mxn2'>
      <div className='lg-col lg-col-7 px2'>
        <p>
          The FBI collects crime data through the&nbsp;
          <a className='blue bold' href='https://ucr.fbi.gov/'>
            Uniform Crime Reporting (UCR) Program
          </a>.
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
      </div>
      <div className='lg-col lg-col-5 px2'>
        <div className='p2 sm-p3 bg-blue white'>
          <h3 className='mt0 mb2'>Further reading</h3>
          <ul className='list-style-none m0 p0'>
            {links.map((l, i) => (
              <li key={i} className='mb1'>
                <a className='white' href={l[0]}>{l[1]}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default AboutTheData
