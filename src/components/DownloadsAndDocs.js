import React from 'react'

const DownloadsAndDocs = () => (
  <section className='container px2 py3'>
    <h1 className='mt0'>Downloads & Documentation</h1>
    <div className='clearfix mxn1'>
      <div className='sm-col sm-col-6 px1 mb2'>
        <div className='p2 sm-p3 bg-silver'>
          <h3 className='mt0 caps'>Crime Data API</h3>
          <p>
            Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
            shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
            tongue pig drumstick capicola swine short loin ham hock kevin.
          </p>
          <a href='#!' className='btn btn-primary'>See API documentation</a>
        </div>
      </div>
      <div className='sm-col sm-col-6 px1 mb2'>
        <div className='p2 sm-p3 bg-silver'>
          <h3 className='mt0 caps'>Documentation</h3>
          <p>
            Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
            shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
            tongue pig drumstick capicola swine short loin ham hock kevin.
          </p>
          <a href='#!' className='btn btn-primary'>See UCR documentation</a>
        </div>
      </div>
    </div>
    <h2>Datasets</h2>
    <p className='h3'>
      Explore crime data from law enforcement agencies across the nation.
    </p>
  </section>
)

export default DownloadsAndDocs
