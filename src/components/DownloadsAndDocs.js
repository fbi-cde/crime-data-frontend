import React from 'react'
import Helmet from 'react-helmet'

import DownloadBulkNibrs from './DownloadBulkNibrs'
import DownloadDataBtn from './DownloadDataBtn'
import Term from './Term'
import otherDatasets from '../../content/datasets.yml'
import markdown from '../util/md'

const border = 'border-bottom border-blue-lighter'
const nibrsTerm = (
  <Term id="national incident-based reporting system (nibrs)" size="lg">
    incident-based (NIBRS)
  </Term>
)

const DownloadsAndDocs = () =>
  <section className="bg-white">
    <Helmet title="CDE :: Downloads & Documentation" />
    <div className="px2 py7 container mx-auto">
      <h1 className={`mt0 mb4 pb1 fs-28 sm-fs-40 ${border}`}>
        Downloads & Documentation
      </h1>
      <div className="clearfix">
        <div className="md-col md-col-9 md-pr7 fs-16 sm-fs-20 serif">
          <p className="mb2 md-m0">
            Download {nibrsTerm} data by year and location. Estimated data
            and other crime-related datasets are also available for download.
            Data is provided as CSV files and can be access via the{' '}
            <a className="underline" href="/api">
              Crime Data
              Explorer API
            </a>.
          </p>
        </div>
        <div className="md-col md-col-3">
          <h3 className="mt-tiny mb2 fs-18 sm-fs-22">Resources</h3>
          <ul className="m0 p0 fs-14 sm-fs-16 left-bars">
            <li className="mb2">
              <a href="https://github.com/18F/crime-data-explorer/blob/master/README.md">
                Readme
              </a>
            </li>
            {/*
            <li className="mb2">
              <a href="/pdf/NIBRS-data-diagram.pdf">
                Data dictionary
              </a>
            </li>
            */}
            <li className="mb2">
              <a href="/pdf/NIBRS-attributes-and-map.pdf">NIBRS attributes</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py7">
        <h2 className={`mt0 mb5 pb1 fs-22 sm-fs-32 ${border}`}>
          Incident-based data by state
        </h2>
        <DownloadBulkNibrs />
      </div>
      <div className="mb8">
        <h2 className={`mt0 mb5 pb1 fs-22 sm-fs-32 ${border}`}>
          Additional datasets
        </h2>
        <div className={`clearfix xs-hide pb1 fs-14 bold caps serif ${border}`}>
          <div className="sm-col sm-col-4 sm-pl2">Dataset</div>
          <div className="sm-col sm-col-8">Description</div>
        </div>
        {otherDatasets.map((d, i) =>
          <div key={i} className={`clearfix pt2 pb4 ${border}`}>
            <div className="sm-col sm-col-4 mb1 sm-px2 fs-16 sm-fs-20 bold">
              {d.title}
            </div>
            <div className="sm-col sm-col-6 mb1 sm-pr2 md-pr4">
              {/* eslint react/no-danger: 0 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: markdown.render(d.description),
                }}
              />
            </div>
            <div className="sm-col sm-col-2 fs-14 bold">
              <a className="block mt1 sm-mt2 fs-12 underline">
                <DownloadDataBtn
                  data={[{ url: d.download }]}
                  text="Download CSV"
                />
              </a>
            </div>
          </div>,
        )}
      </div>
    </div>
  </section>

export default DownloadsAndDocs
