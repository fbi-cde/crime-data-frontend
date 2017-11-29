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
import { summarizedFilterByYear, summarizedCombinePlaces } from '../util/summarized'
import { nationalKey } from '../util/usa'
import { lookupDisplayName } from '../util/location'

class TrendContainer extends React.Component {
  constructor(props) {
    super(props)
    const { until } = props
    this.state = { yearSelected: until }
  }

  getContent = ({ crime, filters, places, summaries, summarized, placeName }) => {
    const { loading, error } = summaries
    const { summarizedLoading, summarizedError } = summarized

    const { yearSelected } = this.state

    if (loading) return <Loading />
    if (error) return <ErrorCard error={error} />

    if (summarizedLoading) return <Loading />
    if (summarizedError) return <ErrorCard error={error} />


    const offenses =
      crime === 'rape' ? ['rape-legacy', 'rape-revised'] : [crime]

    const filteredByYear = filterByYear(summaries.data, filters.since, filters.until)
    console.log('Summaries:', summaries)
    console.log('summarized:', summarized)
    console.log('Summaries FilteredByYear:', filteredByYear)

    const summarizedByYear = summarizedFilterByYear(summarized.data, filters.since, filters.until)
    console.log('Summaries summarizedFilterByYear:', summarizedByYear)

    const data = combinePlaces(filteredByYear, offenses)
    console.log('combinePlaces summary:', data)
    if (!data || data.length === 0) return <NoData />

    const summarizedData = summarizedCombinePlaces(summarizedByYear, offenses)
    console.log('summarizedCombinePlaces summary:', summarizedData)

    const fname = `${filters.place}-${filters.crime}-${filters.since}-${filters.until}`
    const title =
      `Reported ${pluralize(filters.crime)} in ` +
      `${placeName}, ${filters.since}-${filters.until}`

    const readme = generateCrimeReadme(filters.crime, title)
    const crimeNorm = filters.crime === 'rape' ? 'rape-legacy' : filters.crime
    const dlData = data.map(d => {
      const placeData = places.map(p => ({ [p]: { ...d[p][crimeNorm] } }))
      return { year: d.year, ...Object.assign(...placeData) }
    })

    const summarizedDlData = summarizedData.map(d => {
      const placeData = places.map(p => ({ [p]: { ...d[p][crimeNorm] } }))
      return { year: d.year, ...Object.assign(...placeData) }
    })


    const download = [
      { content: readme, filename: 'README.md' },
      { data: dlData, filename: `${fname}.csv` },
    ]

    const summarizedDownload = [
      { content: readme, filename: 'README.md' },
      { data: summarizedDlData, filename: `${fname}.csv` },
    ]

    return (
      <div>
        <TrendChart
          crime={crime}
          filters={filters}
          data={summarizedData}
          places={places}
          onChangeYear={this.updateYear}
          initialYearSelected={yearSelected}
          placeName={placeName}
        />
        <DownloadDataBtn
          ariaLabel={`Download ${title} data as a CSV`}
          data={download}
          filename={fname}
        />
        <DownloadDataBtn
          ariaLabel={`New Download ${title} data as a CSV`}
          data={summarizedDownload}
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
      places,
      summaries,
      summarized,
      region,
      states,
      filters,
    } = this.props
    const placeName = lookupDisplayName(filters, region.regions, states.states)
    const isReady = !summaries.loading

    let otherCrimes = []
    if (filters.crime === 'violent-crime') {
      otherCrimes = ['homicide', 'rape', 'robbery', 'aggravated-assault']
    } else if (filters.crime === 'property-crime') {
      otherCrimes = ['arson', 'burglary', 'larceny', 'motor-vehicle-theft']
    }
    const crime = filters.crime
    const placeType = filters.placeType
    return (
      <div className="mb7">
        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 sm-mb4 fs-24 sm-fs-28 sans-serif">
            {startCase(filters.crime)} rate in {placeType === 'region' ? 'the' : ''} {placeName}, {filters.since}-{filters.until}
          </h2>
          <div className="bg-white">
            {this.getContent({ crime, filters, places, summaries, summarized, placeName })}
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
                      filters,
                      places,
                      summaries,
                      summarized,
                      placeName
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {isReady &&
          <TrendSourceText crime={filters.crime} place={filters.place} placeType={filters.placeType} placeName={placeName} />}
      </div>
    )
  }
}
TrendContainer.propTypes = {
  places: PropTypes.arrayOf(PropTypes.string),
  summaries: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  summarized: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  region: PropTypes.object,
  states: PropTypes.object,
}

export const mapStateToProps = ({ filters, summaries, summarized, region, states }) => {
  const { place } = filters

  const places = [place]
  if (place !== nationalKey) places.push(nationalKey)

  return {
    places,
    summaries,
    summarized,
    ...getPlaceInfo(filters),
    region,
    states,
    filters,
  }
}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TrendContainer)
