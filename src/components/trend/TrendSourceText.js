import PropTypes from 'prop-types';
import React from 'react';

import { EstimatedTerm, NibrsTerm, SrsTerm } from '../Terms';

import ucrParticipationLookup from '../../util/participation';
import lookupUsa from '../../util/usa';

const TrendSourceText = ({ crime, place }) => {
  const isArson = crime === 'arson';
  const { nibrs, srs } = ucrParticipationLookup(place);
  const hybrid = nibrs && srs;

  return (
    <div className="fs-12 italic serif">
      {!isArson
        ? <p>
            Source: FBI, <EstimatedTerm size="sm">Estimated</EstimatedTerm> data
            for {lookupUsa(place).display}.
          </p>
        : <p>
            Source: Reported {srs && <SrsTerm size="sm" />}
            {hybrid && ' and '}
            {nibrs && <NibrsTerm size="sm" />} data from{' '}
            {lookupUsa(place).display}.
          </p>}
    </div>
  );
};

TrendSourceText.propTypes = {
  crime: PropTypes.string,
  place: PropTypes.string,
};

export default TrendSourceText;
