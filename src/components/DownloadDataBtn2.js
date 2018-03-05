/*
This class was created because the format of the data coming from the api munger
would not work with the DownloadDataBtn component, so I created this version
to get the downloads to work. Consider reconciling the DownloadDataBtn
component with the munger data format so this component can be deleted.
*/

import FileSaver from 'file-saver'
import lowerCase from 'lodash.lowercase'
import PropTypes from 'prop-types'
import React from 'react'
import Zip from 'jszip'

import jsonToCsv from '../util/csv'

const triggerUrlDownload = url => {
  const a = document.createElement('a')
  const body = document.querySelector('body')
  a.href = url
  body.appendChild(a)
  a.click()
  body.removeChild(a)
}

const DownloadDataBtn2 = ({ ariaLabel, className, data, filename, text }) => {
  if (!data || data.length === 0) return null

  const clickHander = () => {
    const first = data[0]
    const dirname = filename || `${first.filename}`
    const multipleFiles = data.length > 1
    const zip = new Zip()

    if (!multipleFiles && first.url) return triggerUrlDownload(first.url)

    zip.file(`${dirname}/README.md`, `# ${lowerCase(dirname)}\n`)
    /*
    data.forEach(d => {
      const content = d.data ? jsonToCsv(d.data) : `${d.content}`
      zip.file(`${dirname}/${d.filename}`, content)
    })*/

    const csvData = jsonToCsv(data)
    zip.file(`${dirname}/${filename}.csv`, csvData)

    return zip
      .generateAsync({ type: 'blob' })
      .then(content => {
        FileSaver.saveAs(content, `${dirname}.zip`)
      })
      .catch(e => {
        /* eslint-disable */
        console.error('error from zip generation', {
          err: e,
          args: { data, filename, text },
        })
        /* eslint-enable */
      })
  }

  return (
    <button
      aria-label={ariaLabel}
      className={`btn p0 nowrap ${className}`}
      onClick={clickHander}
    >
      <img
        className="mr-tiny align-tb"
        width="15"
        height="14"
        src="/img/download.svg"
        alt="download"
      />
      {text}
    </button>
  )
}

DownloadDataBtn2.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.object),
      filename: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  text: PropTypes.string,
}

DownloadDataBtn2.defaultProps = {
  ariaLabel: 'Download data',
  className: 'fs-12 blue',
  text: 'Download data',
}

export default DownloadDataBtn2
