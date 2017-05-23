import React from 'react'

const agencyTypes = [
  'City',
  'County',
  'Federal',
  'State Police',
  'University or college',
  'Tribal',
  'Other',
]

const AgencySearchRefine = ({ keyword, onChange, onSubmit }) => (
  <div
    className="p2 absolute col-12 border-box bg-white border"
    style={{ marginTop: -1, minHeight: 280 }}
  >
    <div>
      <label className="mb-tiny fs-18 bold block">Keyword</label>
      <input
        className="mb2 col-12 field field-sm bg-white border-blue"
        type="text"
        name="keyword"
        value={keyword}
        onChange={onChange}
      />
    </div>
    <div>
      <label className="mb-tiny fs-18 bold block">Agency type</label>
      {agencyTypes.map((d, i) => (
        <label key={i} className="block control checkbox">
          <input type="checkbox" value={d} />
          <span className="indicator" />
          <span className="fs-12">{d}</span>
        </label>
      ))}
    </div>
    <div className="mt1">
      <button className="btn btn-sm btn-primary bg-navy" onClick={onSubmit}>
        View results
      </button>
    </div>
  </div>
)

export default AgencySearchRefine
