import lowerCase from 'lodash.lowercase'
import React from 'react'
import Zip from 'jszip'

import jsonToCsv from '../util/csv'
import { slugify } from '../util/text'


const triggerDataDownload = ({ content, filename, type }) => {
  if (window.navigator.msSaveBlob) {
    const blob = new Blob([content], { type })
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const a = document.createElement('a')
    const body = document.querySelector('body')
    a.download = filename
    a.href = `data:${type},${encodeURIComponent(content)}`
    body.appendChild(a)
    a.click()
    body.removeChild(a)
  }
}

const triggerUrlDownload = url => {
  const a = document.createElement('a')
  const body = document.querySelector('body')
  a.href = url
  body.appendChild(a)
  a.click()
  body.removeChild(a)
}

const DownloadDataBtn = ({ data, filename, text }) => {
  if (!data || data.length === 0) return null

  const clickHander = () => {
    const first = data[0]
    const dirname = filename || `${first.filename}`
    const multipleFiles = data.length > 1
    const zip = new Zip()

    if (!multipleFiles && first.url) return triggerUrlDownload(first.url)

    zip.file(`${dirname}/README.md`, `# ${lowerCase(dirname)}\n`)
    data.forEach(d => (
      zip.file(`${dirname}/${slugify(d.filename)}.csv`, jsonToCsv(d.data))
    ))


    return zip.generateAsync({ type: 'base64' }).then(content => {
      triggerDataDownload({
        content,
        filename: `${dirname}.zip`,
        type: 'application/zip;base64',
      })
    }).catch(e => {
      /* eslint-disable */
      console.error('error from b64 zip', { err: e, args: { data, filename, text } })
      /* eslint-enable */
    })
  }

  return (
    <button className='btn p0 fs-12 blue nowrap' onClick={clickHander}>
      <img
        className='mr-tiny align-tb'
        width='15'
        height='14'
        src='/img/download.svg'
        alt='download'
      />
      {text}
    </button>
  )
}

DownloadDataBtn.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    filename: React.PropTypes.string,
    url: React.PropTypes.string,
  })),
  text: React.PropTypes.string,
}

DownloadDataBtn.defaultProps = {
  text: 'Download data',
}

export default DownloadDataBtn
