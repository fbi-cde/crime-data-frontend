import flatten from 'lodash.flatten'
import React from 'react'

const getCols = data => {
  const firstRow = data[0]
  const colsToFlatten = Object.keys(firstRow).map(key => {
    if (typeof firstRow[key] !== 'object') return key
    return Object.keys(firstRow[key]).map(childKey => `${key}.${childKey}`)
  })

  return flatten(colsToFlatten)
}

const shapeDownloadData = data => {
  const cols = getCols(data)
  const values = data.map(d => cols.map(c => {
    const split = c.split('.')
    return (split.length > 1) ? d[split[0]][split[1]] : d[split]
  }))

  return `${cols.join(',')}\n${values.join('\n')}`
}

const downloadData = (fname, data) => {
  const file = `${fname}.csv`
  const dataStr = shapeDownloadData(data)

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
        src='/img/download.svg'
        alt='download'
      />
      {text}
    </button>
  )
}

export default DownloadDataBtn
