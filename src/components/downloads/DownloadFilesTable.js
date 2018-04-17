import React from 'react';
import PropTypes from 'prop-types'
import JsonTable from 'react-json-table'

class DownloadDetailsAccordionBody extends React.Component {

  render() {
    const { files, sampleFile } = this.props
    // console.log('Files:', files)
    console.log('sampleFile:', sampleFile)
    let data;
    if (sampleFile === '/files/pe_employee_data_small.csv') { data = require('../../../public/files/pe_employee_data_small.json') }
      console.log('sampleFile data:', data.headers, data.data)

    return (<div
        className="md-col md-col-10 vl" style={{
        padding: '.5rem .75rem',
      }}>
      <h3 className="mt-tiny mb2 fs-20 sm-fs-22"> What&#39;s in the Download</h3>
      <table ckassName="jsonTable">
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
      <h3 className="mt-tiny mb2 fs-18 sm-fs-22">  Data Preview </h3>
      <JsonTable rows={data} />
    </div>)
  }
}
  DownloadDetailsAccordionBody.propTypes = {
    file: PropTypes.array,
    sampleFile: PropTypes.string,
  }

  export default DownloadDetailsAccordionBody
