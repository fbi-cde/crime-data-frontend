import React from 'react'
import PropTypes from 'prop-types'
import JsonTable from 'react-json-table'
import { Scrollbars } from 'react-custom-scrollbars'

import peCsv from '../../../public/files/pe_employee_data_small.json'
import hcCsv from '../../../public/files/hate_crime_data_small.json'
import ctCsv from '../../../public/files/cargo_theft_data_small.json'
import estCsv from '../../../public/files/estimated_data_small.json'
import htCsv from '../../../public/files/human_trafficking_data_small.json'
import terCsv from '../../../public/files/territories_data_small.json'
import partCsv from '../../../public/files/ucr_participation_data_small.json'
import leoCsv from '../../../public/files/leoka_data_small.json'
import arrestN from '../../../public/files/arrest_national.json'
import arrestA from '../../../public/files/arrests_national_adults.json'
import arrestJ from '../../../public/files/arrests_national_juvenile.json'
import arrestD from '../../../public/files/arrests_national_drug.json'

import DownloadDataBtn from './DownloadDataBtn'

class DownloadDetailsAccordionBody extends React.Component {
  render() {
    const { files, sampleFile, title, fileType, link } = this.props
    let data
    if (sampleFile === '/files/pe_employee_data_small.json') {
      data = peCsv
    } else if (sampleFile === '/files/hate_crime_data_small.json') {
      data = hcCsv
    } else if (sampleFile === '/files/cargo_theft_data_small.json') {
      data = ctCsv
    } else if (sampleFile === '/files/estimated_data_small.json') {
      data = estCsv
    } else if (sampleFile === '/files/territories_data_small.json') {
      data = terCsv
    } else if (sampleFile === '/files/ucr_participation_data_small.json') {
      data = partCsv
    } else if (sampleFile === '/files/human_trafficking_data_small.json') {
      data = htCsv
    } else if (sampleFile === '/files/leoka_data_small.json') {
      data = leoCsv
    } else if (sampleFile === '/files/arrest_national.json') {
      data = arrestN
    } else if (sampleFile === '/files/arrests_national_adults.json') {
      data = arrestA
    } else if (sampleFile === '/files/arrests_national_juvenile.json') {
      data = arrestJ
    } else if (sampleFile === '/files/arrests_national_drug.json') {
      data = arrestD
    }

    return (
      <div
        className="md-col md-col-10 vl"
        style={{
          padding: '.5rem .75rem'
        }}
      >
        <h3 className="mt-tiny mb2 fs-20 sm-fs-22">
          {' '}
          What&#39;s in the Download
        </h3>
        <table className="jsonTable table-bordered">
          <tbody>
            <tr>
              <th>File</th>
              <th>Description</th>
            </tr>
            {files.map(d => (
              <tr key={d.file}>
                <td>{d.file}</td>
                <td>{d.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h3 className="mt-tiny mb2 fs-18 sm-fs-22"> Data Preview </h3>
        <Scrollbars autoHeight style={{ width: 700, height: 300 }}>
          <div>
            <JsonTable rows={data} />
          </div>
        </Scrollbars>
        <br />
        <DownloadDataBtn
          ariaLabel={`Download ${title} as a CSV`}
          className="fs-18 btn-primary right"
          data={[{ url: link }]}
          text={`Download ${fileType}`}
        />
      </div>
    )
  }
}
DownloadDetailsAccordionBody.propTypes = {
  file: PropTypes.array,
  sampleFile: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  fileType: PropTypes.string
}

export default DownloadDetailsAccordionBody
