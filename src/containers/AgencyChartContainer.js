import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import AgencySummaryChart from '../components/agency/AgencySummaryChart'
import AgencyNibrsChart from '../components/agency/AgencyNibrsChart'
import AgencyChartToggle from '../components/agency/AgencyChartToggle'
import DownloadDataBtn from '../components/downloads/DownloadDataBtn'
import ErrorCard from '../components/ErrorCard'
import FootNotesCard from '../components/FootNoteCard'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import { NibrsTerm, SrsTerm } from '../components/Terms'
import { getAgency } from '../util/agencies'

class AgencyChartContainer extends React.Component {
  state = { isSummary: true }

  generateTable(pageType, place, since, nibrsCounts, summary, until, submitsNibrs, isSummary, footnotes) {
    const summaryLoading = summary.loading
    const summaryError = summary.error
    const nibrsError = nibrsCounts.error
    const nibrsLoading = nibrsCounts.loading
    const footnotesLoading = footnotes.loading

    if (summaryLoading || footnotesLoading) return <Loading />
    if (summaryError) return <ErrorCard error={summaryError} />
    if (submitsNibrs && nibrsLoading) return <Loading />
    if (submitsNibrs && nibrsError) return <ErrorCard error={nibrsError} />

    const summaryData = summary.data.data

    let nibrsData

    let nibrsDataClean
    let hasNoNibrsValues
    let noNibrsDataText
    if (submitsNibrs) {
      nibrsData = nibrsCounts.data.offenseCount.data
      nibrsDataClean = nibrsData
         .filter(d => d.key === 'Offense Count' && d.data_year >= since && d.data_year <= until)
         .sort((a, b) => a.data_year - b.data_year)

      hasNoNibrsValues =
         nibrsDataClean.length ===
         nibrsDataClean.filter(d => d.actual === 0 && d.cleared === 0).length

      noNibrsDataText = `There were no ${lowerCase(
         pageType,
       )} offenses reported during this time period.`
    }

    const fname = `${place}-${pageType}-${since}-${until}`
    const summaryDataClean = summaryData
       .filter(d => d.data_year >= since && d.data_year <= until)
       .sort((a, b) => a.data_year - b.data_year)

     const hasNoSummaryValues =
       summaryDataClean.length ===
       summaryDataClean.filter(d => d.actual === 0 && d.cleared === 0).length

     const noun = 'offenses'
     const noSummaryDataText = `There were no ${lowerCase(
       pageType,
     )} ${noun} reported during this time period.`

     const footNotename = `${place}-Foot-Notes-for-${pageType}-${since}-${until}`
     let addFootnoteFile = false;
     if(footnotes.data[0]!== null){
       addFootnoteFile = true
     }


     if (isSummary) {
     return (
       <div>
         {hasNoSummaryValues
           ? <NoData text={noSummaryDataText} />
           : <div>
               <AgencySummaryChart
                 crime={pageType}
                 data={summaryDataClean}
                 since={since}
                 submitsNibrs={false}
                 until={until}
               />
               {addFootnoteFile
                ?
                 <DownloadDataBtn
                   data={[{ data: summaryDataClean, filename: `${fname}.csv` },
                          { data: footnotes.data.data, filename: `${footNotename}.csv` }
                          ]}
                   filename={fname}
                 />
               :
               <DownloadDataBtn
                 data={[{ data: summaryDataClean, filename: `${fname}.csv` }]}
                 filename={fname}
               />
             }
           </div>
         }
           <FootNotesCard footnotes={footnotes.data} />
       </div>
     )
   } else if (!isSummary && submitsNibrs) {
     return (
       <div>
         {hasNoSummaryValues
           ? <NoData text={noNibrsDataText} />
           : <div>
               <AgencyNibrsChart
                 crime={pageType}
                 data={nibrsDataClean}
                 since={since}
                 submitsNibrs
                 until={until}
               />
               <DownloadDataBtn
                 data={[{ data: nibrsDataClean, filename: `${fname}.csv` }]}
                 filename={fname}
               />
             </div>}
       </div>
     )
    }
    return <div />
  }

  render() {
    const { agency, pageType, since, summary, until, place, nibrsCounts, footnotes } = this.props

    if (!agency) return null

    let submitsNibrs = agency.nibrs === true && pageType !== 'violent-crime' && pageType !== 'property-crime'
    submitsNibrs = false;

    return (
      <div className="mb7">

        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
            {startCase(pageType)} reported by {agency.display}, {since}–{until}
          </h2>
          <div className="center">
            {submitsNibrs && !summary.loading && !footnotes.loading &&
              <AgencyChartToggle
              isSummary={this.state.isSummary}
              showSummary={() => {
                this.setState({ isSummary: true })
              }}
              showNibrs={() => {
                this.setState({ isSummary: false })
              }}
              />
            }
          </div>
          {this.generateTable(pageType, place, since, nibrsCounts, summary, until, submitsNibrs, this.state.isSummary, footnotes)}
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
  footnotes: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}


const mapStateToProps = ({ agencies, filters, nibrsCounts, summarized, footnotes }) => ({
  agency: !agencies.loading && getAgency(agencies, filters.place),
  ...filters,
  summary: summarized,
  nibrsCounts,
  footnotes,
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps)(AgencyChartContainer)
