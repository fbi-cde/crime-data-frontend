import React from 'react'

const AgencySearchRefine = ({
  agency_name,
  agency_type,
  city_name,
  county_name,
  onClear,
  onChange,
  onSubmit,
  onClose,
}) => (
  <div
    className="mtn1 p2 absolute col-12 border-box bg-white border rounded"
    style={{ minHeight: 280 }}
  >
    <button
      className="absolute top-0 right-0 btn p-tiny h6 line-height-1"
      onClick={onClose}
    >
      ✕
    </button>
    <label className="mb05 h5 bold block">Agency name / ORI number</label>
    <input
      className="mb2 col-12 field"
      type="text"
      name="agency_name"
      value={agency_name}
      onChange={onChange}
    />

    <label className="mb05 h5 bold block">Agency type</label>
    <input
      className="mb2 col-12 field"
      type="text"
      name="agency_type"
      value={agency_type}
      onChange={onChange}
    />

    <label className="mb05 h5 bold block">City name</label>
    <input
      className="mb2 col-12 field"
      type="text"
      name="city_name"
      value={city_name}
      onChange={onChange}
    />

    <label className="mb05 h5 bold block">County name</label>
    <input
      className="mb2 col-12 field"
      type="text"
      name="county_name"
      value={county_name}
      onChange={onChange}
    />

    <div className="mt1 clearfix">
      <div className="left">
        <button
          className="btn px0 py-tiny line-height-1 navy h5 regular underline"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
      <div className="right">
        <button className="btn btn-sm btn-primary bg-navy" onClick={onSubmit}>
          Search
        </button>
      </div>
    </div>
  </div>
)

export default AgencySearchRefine
