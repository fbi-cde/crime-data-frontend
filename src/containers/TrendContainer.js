import startCase from 'lodash.startcase'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import DownloadDataBtn from '../components/DownloadDataBtn'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import TrendChart from '../components/trend/TrendChart'
import TrendSourceText from '../components/trend/TrendSourceText'
import { generateCrimeReadme } from '../util/content'
import { getPlaceInfo } from '../util/place'
import { combinePlaces, filterByYear } from '../util/summary'
import lookupUsa, { nationalKey } from '../util/usa'
import timeStampString from '../util/date'

class TrendContainer extends React.Component {
  constructor(props) {
    super(props)
    const { until } = props
    this.state = { yearSelected: until }
  }

  getContent = ({ crime, places, since, summaries, until }) => {
    const { loading, error } = summaries
    const { yearSelected } = this.state

    if (loading) return <Loading />
    if (error) return <ErrorCard error={error} />

    const offenses =
      crime === 'rape' ? ['rape-legacy', 'rape-revised'] : [crime]
    const place = places[0]
    const filteredByYear = filterByYear(summaries.data, { since, until })
    const data = combinePlaces(filteredByYear, offenses)

    if (!data || data.length === 0) return <NoData />
    const fname = `${place}-${crime}-${since}-${until}-${timeStampString()}`
    const title =
      `Reported ${pluralize(crime)} in ` +
      `${lookupUsa(place).display}, ${since}-${until}`

    const readme = generateCrimeReadme({ crime, title })
    const crimeNorm = crime === 'rape' ? 'rape-legacy' : crime
    const dlData = data.map(d => {
      const placeData = places.map(p => ({ [p]: { ...d[p][crimeNorm] } }))
      return { year: d.year, ...Object.assign(...placeData) }
    })

    const download = [
      { content: readme, filename: 'README.md' },
      { data: dlData, filename: `${fname}.csv` },
    ]

    return (
      <div>
        <TrendChart
          crime={crime}
          data={data}
          places={places}
          onChangeYear={this.updateYear}
          since={since}
          until={until}
          initialYearSelected={yearSelected}
        />
        <DownloadDataBtn
          ariaLabel={`Download ${title} data as a CSV`}
          data={download}
          filename={fname}
        />
      </div>
    )
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  render() {
    const {
      crime,
      place,
      places,
      placeType,
      since,
      summaries,
      until,
    } = this.props
    const isReady = !summaries.loading

    let otherCrimes = []
    if (crime === 'violent-crime') {
      otherCrimes = ['homicide', 'rape', 'robbery', 'aggravated-assault']
    } else if (crime === 'property-crime') {
      otherCrimes = ['arson', 'burglary', 'larceny', 'motor-vehicle-theft']
    }

    return (
      <div className="mb7">
        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 sm-mb4 fs-24 sm-fs-28 sans-serif">
            {startCase(crime)} rate in {lookupUsa(place).display}, {since}-{until}
          </h2>
          <div className="bg-white">
            {this.getContent({ crime, places, since, summaries, until })}
          </div>
        </div>
        <div>
          <div className="clearfix mxn1 trend-cards">
            {otherCrimes.map((other, i) => {
              const cls = i % 2 === 0 ? 'clear-left' : ''
              return (
                <div key={i} className={`col col-12 sm-col-6 mb2 px1 ${cls}`}>
                  <div className="bg-white p2">
                    <h3 className="mt0 mb2 sm-mb4 fs-18 sans-serif">
                      {startCase(other)}
                    </h3>
                    {this.getContent({
                      crime: other,
                      places,
                      since,
                      summaries,
                      until,
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {isReady &&
          <TrendSourceText crime={crime} place={place} placeType={placeType} />}
      </div>
    )
  }
}
TrendContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.string),
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summaries: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

export const mapStateToProps = ({ filters, summaries }) => {
  const { place } = filters

  const places = [place]
  if (place !== nationalKey) places.push(nationalKey)

  return {
    ...filters,
    ...getPlaceInfo(filters),
    places,
    summaries,
  }
}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TrendContainer)
