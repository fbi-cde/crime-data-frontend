import React from 'react'

import jsonToCsv from '../util/csv'
import { slugify } from '../util/text'

const downloadData = (fname, data) => {
  const file = `${slugify(fname)}.csv`
  const dataStr = jsonToCsv(data)

  if (window.navigator.msSaveBlob) {
    const blob = new Blob([dataStr], { type: 'text/csv' })
    window.navigator.msSaveBlob(blob, file);
  } else {
    const a = document.createElement('a')
    const body = document.querySelector('body')
    a.download = file
    a.href = `data:text/csv,${encodeURIComponent(dataStr)}`
    body.appendChild(a)
    a.click()
    body.removeChild(a)
  }
}

const downloadUrl = url => {
  const a = document.createElement('a')
  const body = document.querySelector('body')
  a.href = url
  body.appendChild(a)
  a.click()
  body.removeChild(a)
}

const DownloadDataBtn = ({ data, text }) => {
  if (!data || data.length === 0) return null

  const clickHander = () => {
    data.forEach(d => {
      if (d.url) {
        downloadUrl(d.url)
      } else if (d.data.length > 0) {
        downloadData(d.filename, d.data)
      }
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
