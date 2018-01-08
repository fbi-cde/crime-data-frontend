import PropTypes from 'prop-types'
import React from 'react'

import { EstimatedTerm, NibrsTerm, SrsTerm } from '../Terms'

import ucrParticipationLookup from '../../util/participation'

const TrendSourceText = ({ crime, place, placeType, placeName }) => {
  const isArson = crime === 'arson'
  const { nibrs, srs } = ucrParticipationLookup(place)
  const hybrid = nibrs && srs


    if (placeType === 'state') {
      return (<div className="fs-12 italic serif">
          {!isArson
            ? <p>
                Source: FBI, <EstimatedTerm size="sm">Estimated</EstimatedTerm> data
                for {placeName}.
              </p>
            : <p>
                Source: Reported {srs && <SrsTerm size="sm" />}
                {hybrid && ' and '}
                {nibrs && <NibrsTerm size="sm" />} data from{' '}
                {placeName}.
              </p>}
        </div>)
    }
      return (<div className="fs-12 italic serif">
              <p>
                Source: FBI, <EstimatedTerm size="sm">Estimated</EstimatedTerm> data
                for {placeName}.
              </p>
        </div>)
}

TrendSourceText.propTypes = {
  crime: PropTypes.string,
  place: PropTypes.string,
  placeType: PropTypes.string,
  placeName: PropTypes.string,
}

export default TrendSourceText
