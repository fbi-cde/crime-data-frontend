import React from 'react'

const downloadData = (fname, data) => {
  const file = `${fname}.csv`
  const cols = Object.keys(data[0])
  const values = data.map(d => cols.map(c => d[c]))
  const dataStr = `${cols.join(',')}\n${values.join('\n')}`

  if (window.navigator.msSaveBlob) {
    const blob = new Blob([dataStr], { type: 'text/csv' })
    window.navigator.msSaveBlob(blob, file);
  } else {
    const body = document.body
    const a = document.createElement('a')
    a.download = file
    a.href = `data:text/csv,${encodeURIComponent(dataStr)}`
    body.appendChild(a)
    a.click()
    body.removeChild(a)
  }
}

const downloadUrl = url => {
  const a = document.createElement('a')
  a.href = url
  a.click()
}

const DownloadDataBtn = ({ data, fname, text, url }) => {
  if ((!data || data.length === 0) && !url) return null

  const clickHander = () => {
    if (url) {
      downloadUrl(url)
    } else if (data.length > 0) {
      downloadData(fname, data)
    }
  }

  return (
    <button className='btn p0 fs-12 nowrap' onClick={clickHander}>
      <img
        className='mr-tiny align-tb'
        width='15'
        height='14'
        src='img/download.svg'
        alt='download'
      />
      {text}
    </button>
  )
}

export default DownloadDataBtn
