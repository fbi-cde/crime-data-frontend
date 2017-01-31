import React from 'react'

const DownloadDataBtn = ({ data, fname, text }) => {
  if (!data) return null

  const file = `${fname}.csv`
  const cols = Object.keys(data[0])
  const values = data.map(d => cols.map(c => d[c]))
  const dataStr = `${cols.join(',')}\n${values.join('\n')}`

  const clickHander = () => {
    // msSaveBlob accommodates IE browsers
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

  return (
    <button className='btn p0 h5 nowrap' onClick={clickHander}>
      <img
        className='mr-tiny align-tb'
        width='15'
        src='/img/download.svg'
        alt='download'
      />
      {text}
    </button>
  )
}

export default DownloadDataBtn
