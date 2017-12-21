import startCase from 'lodash.startcase'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

import DownloadDataBtn from '../DownloadDataBtn'
import NibrsDonut from '../nibrs/NibrsDonut'
import NibrsHistogram from '../nibrs/NibrsHistogram'
import NibrsStackedBar from '../nibrs/NibrsStackedBar'
import NibrsTable from '../nibrs/NibrsTable'
import NibrsTableWithBars from '../nibrs/NibrsTableWithBars'
import { generateCrimeReadme } from '../../util/content'
import { slugify } from '../../util/text'

const ExpandedHomicideCard = ({ crime, data, place, placeType, since, title, until }) => {
const charts = data.map((d, i) => {
  const props = {
    key: i,
    id: slugify(d.title || title).replace(/['’]/g, ''),
    ...d,
  }

  if (placeType === 'agency') return <NibrsTable {...props} />

  switch (d.type) {
    case 'donut':
      return <NibrsDonut {...props} />
    case 'histogram':
      return <NibrsHistogram {...props} />
    case 'stacked':
      return <NibrsStackedBar {...props} />
    case 'table':
      return <NibrsTableWithBars {...props} />
    default:
      return (
        <p key={i}>
          {d.type} not supported!
        </p>
      )
  }
})

const dataIsEmpty =
  data.filter(d => d.data.length === 0).length === data.length
const noun = data.map(d => d.noun).pop()

const download = data.map(d => ({
  data: d.data,
  filename: `${place}-${crime}-${slugify(
    d.title || title,
  )}-${since}-${until}.csv`,
}))

download.push({
  content: generateCrimeReadme({
    crime,
    title: `${title} of reported ${pluralize(crime)} in ${startCase(
      place,
    )}, ${since}–${until}`,
  }),
  filename: 'README.md',
})

return (
  <div className="p2 sm-p3 bg-white black">
    <h2 className="mt0 mb2 pb1 fs-18 sm-fs-22 sans-serif blue border-bottom border-blue-light">
      {title}
    </h2>
    {!dataIsEmpty && charts}
    {dataIsEmpty &&
      <div className="mt-tiny">
        <span className="bold caps fs-12 red">
          Reported {pluralize(noun)}
        </span>
        <span className="bold fs-14 ml1 monospace">0</span>
      </div>}
      <DownloadDataBtn
        ariaLabel={`Download ${title} data as a CSV`}
        data={download}
        filename={`${place}-${crime}-${slugify(title)}-${since}-${until}`}
        text="Download data"
      />
  </div>
)
}

ExpandedHomicideCard.propTypes = {
crime: PropTypes.string,
data: PropTypes.arrayOf(PropTypes.object).isRequired,
place: PropTypes.string,
since: PropTypes.number.isRequired,
title: PropTypes.string.isRequired,
until: PropTypes.number.isRequired,
}

export default ExpandedHomicideCard
