import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import { getPlaceInfo } from '../util/place'
import lookupUsa from '../util/usa'

const PoliceEmploymentContainer = ({
  agency,
  isAgency,
  policeEmployment,
  place,
  placeType,
  since,
  until,
}) => {
  const { data, error } = policeEmployment
  const placeDisplay = isAgency ? agency.display : lookupUsa(place).display
  const isLoading = policeEmployment.loading
  const isReady = !isLoading && error === null && !!data

  let content = null;
  if(isReady){
    content = (
      <table className="table-bordered">
        <tr>
        <th>Year</th>
        <th>Population</th>
        <th>Total Law Enforcement Employees</th>
        <th>Total Officers</th>
        <th>Total Civilians</th>
        <th>LE Employees per 1000 inhabitants</th>
        </tr>
        {data[place].map(function(yearData){
          return (
          <tr>
            <td>{yearData.data_year}</td>
            <td>{yearData.population}</td>
            <td>{yearData.total_pe_ct}</td>
            <td>{yearData.officer_ct}</td>
            <td>{yearData.civilian_ct}</td>
            <td>{yearData.pe_ct_per_1000}</td>
          </tr>
          )
        })}
      </table>
    )
  }

  return (
    <div className="mb6">
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
          {placeDisplay} Police Employment
        </h2>
        {isLoading && <Loading />}
        {content}
      </div>
    </div>
  )
}

PoliceEmploymentContainer.propTypes = {
  policeEmployment: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, policeEmployment }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  return {
    ...filters,
    agency,
    isAgency,
    place,
    placeType,
    policeEmployment,
  }
}

export default connect(mapStateToProps)(PoliceEmploymentContainer)
