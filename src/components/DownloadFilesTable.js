import React from 'react';
import PropTypes from 'prop-types'

class DownloadDetailsAccordionBody extends React.Component {
  render() {
    const { files, imagePath } = this.props
    console.log('Files:', files)
    console.log('imagePath:', imagePath)

    return (<div
className="md-col md-col-10 vl" style={{
        padding: '.5rem .75rem',
      }}>
      <h3 className="mt-tiny mb2 fs-20 sm-fs-22"> What&#39;s in the Download</h3>
      <table>
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
      <h3 className="mt-tiny mb2 fs-18 sm-fs-22">  Data Preview (first 10 rows) </h3>
       <img src={imagePath} alt="Data Preview" />
    </div>)
  }
}
  DownloadDetailsAccordionBody.propTypes = {
    file: PropTypes.array,
    imagePath: PropTypes.string,
  }

  export default DownloadDetailsAccordionBody
