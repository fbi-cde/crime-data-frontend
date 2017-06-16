import React from 'react'

import DownloadBulkNibrs from './DownloadBulkNibrs'
import DownloadDataBtn from './DownloadDataBtn'
import Term from './Term'
import otherDatasets from '../../content/datasets.yml'
import markdown from '../util/md'

const border = 'border-bottom border-blue-lighter'

const DownloadsAndDocs = () =>
  <section className="bg-white">
    <div className="px2 py3 container mx-auto">
      <h1 className={`mt4 mb5 pb1 sm-mt4 fs-28 sm-fs-40 ${border}`}>
        Downloads & Documentation
      </h1>
      <DownloadBulkNibrs />
      <div className="mb8">
        <h2 className={`mt0 mb5 pb1 fs-22 sm-fs-32 ${border}`}>
          Bulk downloads
        </h2>
        <div className={`clearfix xs-hide pb1 fs-18 bold caps serif ${border}`}>
          <div className="sm-col sm-col-4 sm-pl2">Dataset</div>
          <div className="sm-col sm-col-4">Description</div>
          <div className="sm-col sm-col-4">Type of data</div>
        </div>
        {otherDatasets.map((d, i) =>
          <div key={i} className={`clearfix pt2 pb4 ${border}`}>
            <div className="sm-col sm-col-4 mb1 sm-px2 fs-18 sm-fs-22 bold">
              {d.title}
            </div>
            <div className="sm-col sm-col-4 mb1 sm-pr2 md-pr4">
              {/* eslint react/no-danger: 0 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: markdown.render(d.description),
                }}
              />
            </div>
            <div className="sm-col sm-col-4 fs-14 bold">
              Summary (SRS) available
              <a className="block mt1 sm-mt2 fs-12 underline">
                <DownloadDataBtn data={[{ url: d.download }]} />
              </a>
            </div>
          </div>,
        )}
      </div>
      <div className="mb8">
        <h2 className={`mt0 mb5 pb1 fs-22 sm-fs-32 ${border}`}>
          Documentation
        </h2>
        <div className="flex flex-wrap mxn1">
          <div className="flex sm-col sm-col-6 px1 mb2">
            <div className="p2 sm-p4 bg-blue-white">
              <h3 className="mt0 mb2 pb1 fs-22 sans-serif border-bottom border-red-bright">
                Crime data API
              </h3>
              <p>
                Use our{' '}
                <Term id="application programming interface (api)">
                  application programming interface (API)
                </Term>{' '}
                to search and export the
                FBI’s{' '}
                <Term id="uniform crime reporting (ucr) program">
                  Uniform Crime Reporting (UCR) Program
                </Term>{' '}
                data.
              </p>
              <a className="btn btn-primary btn-sm fs-14" href="/api">
                See API documentation
              </a>
            </div>
          </div>
          <div className="sm-col sm-col-6 px1 mb2">
            <div className="p2 sm-p4 bg-blue-white">
              <h3 className="mt0 mb2 pb1 fs-22 sans-serif border-bottom border-red-bright">
                Data documentation
              </h3>
              <p>
                Download the latest resources, user manuals, and technical
                specifications for the FBI’s various crime data collections.
              </p>
              <a
                className="btn btn-primary btn-sm fs-14"
                href="https://ucr.fbi.gov/"
              >
                See UCR documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

export default DownloadsAndDocs
