/* eslint-disable react/no-danger */
import React from 'react'
import Helmet from 'react-helmet'

import DownloadBulkNibrs from '../components/downloads/DownloadBulkNibrs'
import SharingTags from '../components/SharingTags'
import DownloadAccordion from '../components/downloads/DownloadAccordion'

const border = 'border-bottom border-blue-light'

const DownloadsAndDocs = () => (
  <section className="bg-white">
    <Helmet title="CDE :: Downloads & Documentation" />
    <SharingTags title="Downloads & Documentation" />
    <div className="px2 py7 container mx-auto">
      <h1 className={`mt0 mb4 pb1 fs-28 sm-fs-40 ${border}`}>
        Downloads & Documentation
      </h1>
      <div className="clearfix">
        <div className="md-col md-col-9 md-pr7 fs-16 sm-fs-20 serif">
          <p className="mb2 md-m0">
            The Crime Data Explorer (CDE) provides select bulk data sets for
            download. Incident-based data by state, summary data with estimates,
            and data on specific topics like assaults on law enforcement
            officers, hate crime, or human trafficking are available for
            download in CSV files below. Data is also available via the{' '}
            <a className="underline" href="/api">
              Crime Data Explorer API
            </a>, a read-only web service that returns JSON or CSV data and
            provides experienced users access to large amounts of UCR data to
            use and share. Because this data is dynamic, be aware of the time
            stamp that reflects the refresh date of content. The data provided
            from{' '}
            <a href="https://ucr.fbi.gov/" className="underline">
              Uniform Crime Reporting (UCR) Program
            </a>{' '}
            for 2016 Closed Master Data was made available on 6/22/2018.
          </p>
        </div>
        <div className="md-col md-col-3">
          <h3 className="mt-tiny mb2 fs-18 sm-fs-22">Resources</h3>
          <ul className="m0 p0 fs-14 sm-fs-16 left-bars">
            <li className="mb2">
              <a href="https://github.com/fbi-cde/crime-data-frontend/blob/master/README.md">
                Readme{' '}
              </a>
              <img
                className="mr1 align-middle"
                width="20"
                src="/img/github.svg"
                alt="github"
              />
            </li>
            <li className="mb2">
              <a href="/pdf/NIBRS_DataDictionary.pdf">NIBRS Data Dictionary</a>
            </li>
            <li className="mb2">
              <a href="/pdf/nibrs_diagram.pdf">NIBRS Data Diagram</a>
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
      <div className="py7">
        <h2 className={`mt0 mb5 pb1 fs-22 sm-fs-32 ${border}`}>
          Additional datasets
        </h2>
        <DownloadAccordion />
      </div>
    </div>
  </section>
)

export default DownloadsAndDocs
