import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { getPlaceInfo } from '../util/place'

class LeokaContainer extends React.Component {
  render() {
    return (<div>Test</div>)
  }
}

LeokaContainer.propTypes = {
  leokaData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ leokaData, filters }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)

  return {
    place,
    placeType,
    since,
    until,
    leokaData,
    }
}

export default connect(mapStateToProps)(LeokaContainer)
