import startCase from 'lodash.startcase'
import uniqBy from 'lodash.uniqby'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import AgencyChart from './AgencyChart'
import DownloadDataBtn from './DownloadDataBtn'
import Loading from './Loading'
import NoData from './NoData'
import { getAgency } from '../util/ori'

const mockData = [
  { cleared: 16, reported: 20, year: 2004 },
  { cleared: 2, reported: 4, year: 2005 },
  { cleared: 12, reported: 17, year: 2006 },
  { cleared: 5, reported: 10, year: 2007 },
  { cleared: 9, reported: 10, year: 2008 },
  { cleared: 4, reported: 6, year: 2009 },
  { cleared: 5, reported: 11, year: 2010 },
  { cleared: 3, reported: 5, year: 2011 },
  { cleared: 7, reported: 10, year: 2012 },
  { cleared: 13, reported: 16, year: 2013 },
  { cleared: 16, reported: 20, year: 2014 },
]

const getContent = ({ crime, place, summary }) => {
  if (summary.loading) return <Loading />

  const data = mockData || summary.data[place]
  if (!data || data.length === 0) return <NoData />

  const dataClean = uniqBy(data.filter(d => d.year >= 2004), 'year')
  return <AgencyChart crime={crime} data={dataClean} />
}

const AgencyChartContainer = ({
  agency,
  crime,
  place,
  since,
  summary,
  until,
}) => {
  const content = getContent({ crime, place, summary })
  const fname = `${place}-${crime}-${since}–${until}`

  return (
    <div>
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 fs-24 sm-fs-32 sans-serif">
          {startCase(crime)} incidents reported by the{' '}
          {agency.agency_name} [Agency Type], {since}-{until}
        </h2>
        {content}
        <DownloadDataBtn
          data={[{ data: mockData, filename: `${fname}.csv` }]}
          filename={fname}
        />
      </div>
    </div>
  )
}

AgencyChartContainer.propTypes = {
  agency: PropTypes.object.isRequired,
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summary: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, summaries }) => ({
  agency: getAgency(agencies, filters.place),
  ...filters,
  summary: summaries,
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(
  AgencyChartContainer,
)
