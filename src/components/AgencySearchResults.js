import React from 'react'

const AgencySearchResults = ({ data, onClick }) => (
  <div
    className="mb2 p2 absolute col-12 border-box bg-white border overflow-auto"
    style={{ marginTop: -1, maxHeight: 240 }}
  >
    <div className="mb1 fs-20 bold line-height-2">Results</div>
    <ul className="m0 list-reset fs-12">
      {data.slice(0, 100).map((d, i) => (
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
)

export default AgencySearchResults
