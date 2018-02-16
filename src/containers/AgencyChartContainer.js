import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import AgencyChart from '../components/agency/AgencyChart'
import AgencyChartToggle from '../components/agency/AgencyChartToggle'
import DownloadDataBtn from '../components/DownloadDataBtn'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import { NibrsTerm, SrsTerm } from '../components/Terms'
import { getAgency } from '../util/agencies'

class AgencyChartContainer extends React.Component {
  state = { isEstimate: false }

  generateTable(pageType, place, since, nibrsCounts, summary, until, submitsNibrs, isEstimate) {
    const { summaryError, summaryLoading } = summary
    const { nibrsError, nibrsLoading } = nibrsCounts

    if (summaryLoading) return <Loading />
    if (summaryError) return <ErrorCard error={summaryError} />
    if (nibrsLoading) return <Loading />
    if (nibrsError) return <ErrorCard error={nibrsError} />

    const data = summary.data[place]
    // if (!data || data.length === 0) return <NoData />

    const fname = `${place}-${pageType}-${since}-${until}`
    const dataClean = data
      .filter(d => d.year >= since && d.year <= until)
      .sort((a, b) => a.year - b.year)

    const hasNoValues =
      dataClean.length ===
      dataClean.filter(d => d.reported === 0 && d.cleared === 0).length

    const noun = submitsNibrs ? 'incidents' : 'offenses'
    const noDataText = `There were no ${lowerCase(
      pageType,
    )} ${noun} reported during this time period.`

    if (isEstimate) {
      console.log('Create Summary Grid')
      return (
        <div>
          {hasNoValues
            ? <NoData text={noDataText} />
            : <div>
                <AgencyChart
                  crime={pageType}
                  data={dataClean}
                  since={since}
                  submitsNibrs={submitsNibrs}
                  until={until}
                />
                <DownloadDataBtn
                  data={[{ data: dataClean, filename: `${fname}.csv` }]}
                  filename={fname}
                />
              </div>}
        </div>
      )
    } else if (!isEstimate) {
      console.log('Create Summary NIBRS Grid')

        return (<div>
        NIBRS TABLE
        </div>)
    }
    return <div />
  }

  render() {
    const { agency, pageType, since, summary, until, place, nibrsCounts } = this.props

    if (!agency) return null

    const submitsNibrs = agency.nibrs_months_reported === 12
    const noun = submitsNibrs ? 'incidents' : 'offenses'
    console.log('State:', this.state)
    return (
      <div className="mb7">

        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
            {startCase(pageType)} {noun} reported by {agency.display}, {since}–{until}
          </h2>
          <div className="center">
            {submitsNibrs &&
              <AgencyChartToggle
              isEstimate={this.state.isEstimate}
              showEstimate={() => {
                this.setState({ isEstimate: true })
              }}
              showNibrs={() => {
                this.setState({ isEstimate: false })
              }}
              />
            }
          </div>
          {this.generateTable(pageType, place, since, nibrsCounts, summary, until, submitsNibrs, this.state.isEstimate)}
        </div>
        {!summary.loading &&
          <div className="fs-12 serif italic">
            No data or low data may be the result of an agency not participating,
            reporting no incidents, changes in reporting, or being “covered by”
            another agency. In addition, classification, organization, and the
            hierarchy of agencies can vary by state. To learn more, please see
            agency-level data in the{' '}
            <a
              className="mr-tiny underline"
              href="https://ucr.fbi.gov/crime-in-the-u.s"
            >
              Crime in the United States publications
            </a>. Source: Reported {submitsNibrs
              ? <NibrsTerm />
              : <SrsTerm />}{' '}
            data from {agency.display}.
          </div>}
      </div>
    )
  }
}

AgencyChartContainer.propTypes = {
  agency: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  pageType: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summary: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  nibrsCounts: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, nibrsCounts, summaries }) => ({
    agency: !agencies.loading && getAgency(agencies, filters.place),
    ...filters,
    summary: summaries,
    nibrsCounts,
  })

export default connect(mapStateToProps)(AgencyChartContainer)
