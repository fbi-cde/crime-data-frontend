import React from 'react'
import PropTypes from 'prop-types'
import startCase from 'lodash.startcase'
import pluralize from 'pluralize'

import DownloadDataBtn from '../DownloadDataBtn'
import ErrorCard from '../ErrorCard'
import Loading from '../Loading'
import NoData from '../NoData'
import OffenseTrendChart from './OffenseTrendChart'
import { generateCrimeReadme } from '../../util/content'
import lookupUsa, { nationalKey } from '../../util/usa'

class OffenseTrendCard extends React.Component {
  render() {
    const { trendData, since, until, places, place } = this.props
    let crime = trendData.offense

    if (crime === 'rape-legacy' || crime === 'rape-revised') {
      crime = 'rape'
    }

    const fname = `${place}-${crime}-${since}-${until}`
    const title =
      `Reported ${pluralize(crime)} in ` +
      `${lookupUsa(place).display}, ${since}-${until}`
    const dlData = {}
    /*
    const dlData = trendData.map(
      d => ({ foo: bar }),
      // const placeData = places.map(p => ({ [p]: { ...d[p][crimeNorm] } }));
      // return { year: d.year, ...Object.assign(...placeData) };
    );
    */

    const readme = generateCrimeReadme({ crime, title })

    const download = [
      { content: readme, filename: 'README.md' },
      { data: dlData, filename: `${fname}.csv` },
    ]

    console.log('OffenseTrendCard Trend Data:', trendData)
    return (
      <div className="p2 sm-p3 bg-white black">
        <h2 className="mt0 mb2 pb1 fs-14 sm-fs-18 sans-serif blue border-bottom border-blue-light">
          {startCase(trendData.offense)} rates, XXXX
        </h2>
        <OffenseTrendChart trendData={trendData} since={since} until={until} />
        <DownloadDataBtn
          ariaLabel={`Download ${title} data as a CSV`}
          data={download}
          filename={fname}
        />
      </div>
    )
  }
}
OffenseTrendCard.propTypes = {
  trendData: PropTypes.object,
  place: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  places: PropTypes.arrayOf(PropTypes.string),
}
export default OffenseTrendCard
