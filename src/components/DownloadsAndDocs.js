import React from 'react'

const data = [
  {
    title: 'Violent Crime',
    dates: '1960—2014',
  },
  {
    title: 'Homicide',
    dates: '1962—2014',
  },
  {
    title: 'Rape',
    dates: '1965—2014',
  },
]

const DownloadsAndDocs = () => (
  <section className='bg-white'>
    <div className='px2 py3 container'>
      <h1 className='mt0'>Downloads & Documentation</h1>
      <div className='clearfix mxn1 mb3'>
        <div className='sm-col sm-col-6 px1 mb2'>
          <div className='p2 sm-p3 bg-blue-lighter'>
            <h3 className='mt0 caps'>Crime Data API</h3>
            <p>
              Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
              shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
              tongue pig drumstick capicola swine short loin ham hock kevin.
            </p>
            <a href='#!' className='btn btn-primary bg-blue'>See API documentation</a>
          </div>
        </div>
        <div className='sm-col sm-col-6 px1 mb2'>
          <div className='p2 sm-p3 bg-blue-lighter'>
            <h3 className='mt0 caps'>Documentation</h3>
            <p>
              Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
              shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
              tongue pig drumstick capicola swine short loin ham hock kevin.
            </p>
            <a href='#!' className='btn btn-primary bg-blue'>See UCR documentation</a>
          </div>
        </div>
      </div>
      <h2>Datasets</h2>
      <p className='h3'>
        Explore crime data from law enforcement agencies across the nation.
      </p>
      {data.map((d, i) => (
        <div key={i} className={`border-bottom ${i === 0 ? 'border-top' : ''}`}>
          <div className='clearfix mxn2 py2'>
            <div className='sm-col sm-col-4 px2 mb1 sm-m0'>
              <div className='h3 bold'>{d.title}<br />{d.dates}</div>
            </div>
            <div className='sm-col sm-col-4 px2 mb1 sm-m0'>
              <p className='m0'>
                Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
                shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
                tongue pig drumstick capicola swine short loin ham hock kevin.
              </p>
            </div>
            <div className='sm-col sm-col-4 px2 mb1 sm-m0'>
              <div><span className='blue'>▶</span> Crime trends (SRS)</div>
              <div><span className='red'>▶</span> Incidents (NIBRS)</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default DownloadsAndDocs
