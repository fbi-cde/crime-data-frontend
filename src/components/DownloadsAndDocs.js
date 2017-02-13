import React from 'react'

import otherDatasets from '../../content/datasets.yml'

const border = 'border-bottom border-blue-lighter'

const DownloadsAndDocs = () => (
  <section className='bg-white'>
    <div className='px2 py3 container mx-auto'>
      <h1 className='mt2 sm-mt4 fs-28 sm-fs-40'>Downloads & Documentation</h1>
      <div className='clearfix mxn1 mb3'>
        <div className='sm-col sm-col-6 px1 mb2'>
          <div className='p2 sm-p4 bg-blue-lighter'>
            <h3 className='mt0 fs-22 sans-serif caps'>Crime Data API</h3>
            <p>
              Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
              shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
              tongue pig drumstick capicola swine short loin ham hock kevin.
            </p>
            <a
              className='btn btn-primary bg-blue'
              href='https://crime-data-api.fr.cloud.gov/swagger-ui/'
            >
              See API documentation
            </a>
          </div>
        </div>
        <div className='sm-col sm-col-6 px1 mb2'>
          <div className='p2 sm-p4 bg-blue-lighter'>
            <h3 className='mt0 fs-22 sans-serif caps'>Documentation</h3>
            <p>
              Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon
              shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank
              tongue pig drumstick capicola swine short loin ham hock kevin.
            </p>
            <a href='#!' className='btn btn-primary bg-blue'>See UCR documentation</a>
          </div>
        </div>
      </div>
      <h2 className='mb2 fs-22 sm-fs-32'>Other Datasets</h2>
      <table className='mb3'>
        <tr className='caps serif'>
          <th className={`${border} border-top py2 pl2`} scope='col'>
            Type of crime
          </th>
          <th className={`${border} border-top py2`} scope='col'>
            Description
          </th>
          <th className={`${border} border-top py2`} scope='col'>
            Type of data
          </th>
        </tr>
        {otherDatasets.map((d, i) => {
          const base = `col-4 pt2 ${border}`
          return (
            <tr key={i}>
              <td
                className={`${base} bold fs-16 sm-fs-22 pb3 pl2 pr4`}
              >
                {d.title}
              </td>
              <td
                className={`${base} pb3 pr4`}
              >
                {d.description}
              </td>
              <td className={base}>
                Summary and NIBRS available
                <a className='block underline'>
                  <a href={d.download}>Dowload CSV</a>
                </a>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  </section>
)

export default DownloadsAndDocs
