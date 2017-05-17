import React from 'react'

const AgencySearchResults = ({ data, onClick }) => (
  <ul
    className="mt-tiny mb2 absolute h5 list-reset col-12 border-box bg-white border rounded overflow-auto"
    style={{ maxHeight: 240 }}
  >
    {data.slice(0, 100).map((d, i) => (
      <li key={i} className="">
        <a
          className="px1 block black truncate"
          style={{ lineHeight: '1.75' }}
          href="#!"
          onClick={onClick(d)}
        >
          {d.agency_name}
        </a>
      </li>
    ))}
  </ul>
)

export default AgencySearchResults
