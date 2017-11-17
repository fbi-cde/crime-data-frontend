import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

const prevent = e => e.preventDefault()

/* eslint-disable camelcase */
const AgencySearchResultItem = ({ agency, onClick }) => {
  /*
  const isActive =
    (months_reported && months_reported !== 0) ||
    (nibrs_months_reported && nibrs_months_reported !== 0)
  const color = isActive ? 'black' : 'blue-light cursor-default'
*/
const color = 'black'

  return (
    <li>
      <a
        className={`block truncate ${color}`}
        style={{ lineHeight: '1.75' }}
        href="#!"
        id={agency.ori}
        onClick={onClick(agency)}
      >
        {agency.agency_name_edit}
      </a>
    </li>
  )
}
/* eslint-enable camelcase */

const AgencySearchResults = ({
  data,
  groupKey,
  groupValues,
  onResultsClick,
  onStateClick,
  usState,
}) => {
  const noFederal = data.filter(d => d.agency_type_name !== 'Federal')


  const dataGrouped = groupValues.map(key => ({
    key,
    data: noFederal.filter(d => d[groupKey] === key),
  }))
  dataGrouped.push({
    key: 'No assigned county',
    data: noFederal.filter(d => d[groupKey] === null),
  })


  console.log('dataGrouped:', dataGrouped)

  return (
    <div className="mb2 absolute bg-white col-12" style={{ maxHeight: 310 }}>
      <div
        className="p2 border-box border-top border-left border-right overflow-auto"
        style={{ marginTop: -1, maxHeight: 180 }}
      >
        {noFederal.length === 0 && <div className="fs-12">No results</div>}
        {dataGrouped.filter(g => g.data.length > 0).map(g =>
          <div key={g.key}>
            <div className="fs-10 bold caps blue">
              {g.key}
            </div>
            <ul className="mt0 mb1 list-reset fs-12">
              {g.data
                .slice(0, 100)
                .sort((a, b) => a.agency_name < b.agency_name)
                .map((d, i) =>
                  <AgencySearchResultItem
                    agency={d}
                    key={i}
                    onClick={onResultsClick}
                  />,
                )}
            </ul>
          </div>,
        )}
      </div>
      <div className="px2 pb2 border-box bg-white border-left border-right border-bottom">
        <hr className="mt0 mb2" />
        <p className="mb2 fs-12 italic serif">
          Agencies that have submitted a full year’s worth of data in 2016 are
          listed in dark blue.
        </p>
        <button
          className="btn btn-primary regular py0 px1 fs-14"
          onClick={() => onStateClick(usState)}
        >
          View {startCase(usState)}
        </button>
      </div>
    </div>
  )
}

AgencySearchResults.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupKey: PropTypes.string.isRequired,
  groupValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onResultsClick: PropTypes.func.isRequired,
  onStateClick: PropTypes.func.isRequired,
  usState: PropTypes.string.isRequired,
}

export default AgencySearchResults
