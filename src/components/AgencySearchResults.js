import PropTypes from 'prop-types'
import React from 'react'

const AgencySearchResults = ({ data, groupKey, groupValues, onClick }) => {
  const noFederal = data.filter(d => d.agency_type_name !== 'Federal')
  const dataGrouped = groupValues.map(key => ({
    key,
    data: noFederal.filter(d => d[groupKey] === key),
  }))
  dataGrouped.push({
    key: 'Unspecified',
    data: noFederal.filter(d => d[groupKey] === null),
  })

  return (
    <div
      className="mb2 p2 absolute col-12 border-box bg-white border overflow-auto"
      style={{ marginTop: -1, maxHeight: 240 }}
    >
      <div className="mb1 pb-tiny fs-16 bold line-height-1">Results</div>
      {noFederal.length === 0 && <div className="fs-12">No results</div>}
      {dataGrouped.filter(g => g.data.length > 0).map(g => (
        <div key={g.key}>
          <div className="mt1 fs-10 bold caps blue">{g.key}</div>
          <ul className="m0 list-reset fs-12">
            {g.data
              .slice(0, 100)
              .sort((a, b) => a.agency_name < b.agency_name)
              .map((d, i) => (
                <li key={i} className="">
                  <a
                    className="block black truncate"
                    style={{ lineHeight: '1.75' }}
                    href="#!"
                    onClick={onClick(d)}
                  >
                    {d.agency_name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

AgencySearchResults.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupKey: PropTypes.string.isRequired,
  groupValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default AgencySearchResults
