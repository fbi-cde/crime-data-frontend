import React from 'react'

import DownloadBulkNibrs from './DownloadBulkNibrs'
import DownloadDataBtn from './DownloadDataBtn'
import otherDatasets from '../../content/datasets.yml'

const border = 'border-bottom border-blue-lighter'

const DownloadsAndDocs = () => (
  <section className='bg-white'>
    <div className='px2 py3 container mx-auto'>
      <h1 className='mt4 mb7 pb1 sm-mt4 fs-28 sm-fs-40 border-bottom border-blue-lighter'>
        Downloads & Documentation
      </h1>
      <div className='clearfix mxn1 mb8'>
        <div className='sm-col sm-col-6 px1 mb2'>
          <div className='p2 sm-p4 bg-blue-white'>
            <h3 className='mt0 mb2 pb1 fs-22 sans-serif border-bottom border-red-bright'>
              Crime Data API
            </h3>
            <p>
              Use our <Term dispatch={dispatch} id='application programming interface (api)'>application programming interface (API)</Term> to search and export the FBI’s Uniform Crime Reporting data.
            </p>
            <a
              className='btn btn-primary btn-sm fs-14'
              href='https://crime-data-api.fr.cloud.gov/swagger-ui/'
            >
              See API documentation
            </a>
          </div>
        </div>
        <div className='sm-col sm-col-6 px1 mb2'>
          <div className='p2 sm-p4 bg-blue-white'>
            <h3 className='mt0 mb2 pb1 fs-22 sans-serif border-bottom border-red-bright'>
              Uniform Crime Reporting documentation
            </h3>
            <p>
              Download the latest user manuals, resources, and technical specifications for the FBI’s various crime data collections.
            </p>
            <a
              className='btn btn-primary btn-sm fs-14'
              href='https://ucr.fbi.gov/'
            >
              See UCR documentation
            </a>
          </div>
        </div>
      </div>
      <DownloadBulkNibrs />
      <div className='mb6'>
        <h2 className={`mt0 mb3 pb1 fs-22 sm-fs-32 ${border}`}>
          Other datasets
        </h2>
        <div className={`clearfix xs-hide pb1 fs-18 bold caps serif ${border}`}>
          <div className='sm-col sm-col-4 sm-pl2'>Type of crime</div>
          <div className='sm-col sm-col-4'>Description</div>
          <div className='sm-col sm-col-4'>Type of data</div>
        </div>
        {otherDatasets.map((d, i) => (
          <div key={i} className={`clearfix pt2 pb4 ${border}`}>
            <div className='sm-col sm-col-4 mb1 sm-px2 fs-18 sm-fs-22 bold'>
              {d.title}
            </div>
            <div className='sm-col sm-col-4 mb1 sm-pr2 md-pr4'>
              {d.description}
            </div>
            <div className='sm-col sm-col-4 fs-14 bold'>
              Summary and NIBRS available
              <a className='block mt1 sm-mt2 fs-12 underline'>
                <DownloadDataBtn
                  url={d.download}
                  text='Download CSV'
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default DownloadsAndDocs
