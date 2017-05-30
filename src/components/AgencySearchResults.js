import React from 'react'

const groupKey = 'agency_type_name'
const groupValues = [
  'City',
  'County',
  'University or College',
  'Federal',
  'State Police',
  'Tribal',
  'Other',
  'Other State Agency',
  'Unknown',
]

const AgencySearchResults = ({ data, onClick }) => {
  const dataGrouped = groupValues.map(key => {
    const filtered = data.filter(d => d[groupKey] === key)
    return {
      key,
      data: filtered,
      count: filtered.length,
    }
  })

  return (
    <div
      className="mb2 p2 absolute col-12 border-box bg-white border overflow-auto"
      style={{ marginTop: -1, maxHeight: 240 }}
    >
      <div className="mb1 pb-tiny fs-16 bold line-height-1">Results</div>
      {dataGrouped.filter(g => g.count > 0).map(g => (
        <div key={g.key}>
          <div className="mt1 fs-10 bold caps blue-light">{g.key}</div>
          <ul className="m0 list-reset fs-12">
            {g.data.slice(0, 100).map((d, i) => (
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

export default AgencySearchResults
