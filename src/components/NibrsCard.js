import pluralize from 'pluralize'
import React from 'react'

import DownloadDataBtn from './DownloadDataBtn'
import NibrsDonut from './NibrsDonut'
import NibrsHistogram from './NibrsHistogram'
import NibrsTable from './NibrsTable'
import { slugify } from '../util/text'

const NibrsCard = ({ crime, data, place, since, title, until }) => {
  const charts = data.map((d, i) => {
    const props = { key: i, ...d }
    switch (d.type) {
      case 'donut':
        return <NibrsDonut {...props} />
      case 'histogram':
        return <NibrsHistogram {...props} />
      case 'table':
        return <NibrsTable {...props} />
      default:
        return <p key={i}>{d.type} not supported!</p>
    }
  })

  const dataIsEmpty = (data.filter(d => d.data.length === 0).length === data.length)
  const noun = data.map(d => d.noun).pop()

  const download = data.map(d => ({
    data: d.data,
    filename: `${place}-${crime}-${slugify(d.title || title)}-${since}-${until}`,
  }))

  return (
    <div className='p2 sm-p3 bg-white black'>
      <h2 className='mt0 mb2 pb1 fs-18 sm-fs-22 sans-serif blue border-bottom border-blue-light'>
        {title}
      </h2>
      {!dataIsEmpty && charts}
      {dataIsEmpty && (
        <div className='mt-tiny'>
          <span className='bold caps fs-12 red'>Reported {pluralize(noun)}</span>
          <span className='bold fs-14 ml1 monospace'>0</span>
        </div>
      )}
      <DownloadDataBtn
        data={download}
        text='Download data'
      />
    </div>
  )
}

NibrsCard.propTypes = {
  crime: React.PropTypes.string,
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  place: React.PropTypes.string,
  since: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  until: React.PropTypes.number.isRequired,
}

export default NibrsCard
