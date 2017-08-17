import PropTypes from 'prop-types';
import React from 'react';

import { formatRound as fmt } from '../../util/formats';

const NibrsDonutDetails = ({
  colorMap,
  data,
  onMouseOver,
  onMouseOut,
  selected,
}) =>
  <div className="mt2 lg-mt4">
    <span className="mb2 bold caps fs-12 red">Incidents</span>
    <ul className="list-style-none p0 m0 fs-14">
      {data.map((d, i) => {
        const active = d.key === selected;
        const border = active
          ? 'border-bottom border-w2'
          : 'border-bottom-dashed';
        const opacity = selected === null || active ? 1 : 0.5;
        return (
          <li
            key={i}
            className={`mb1 flex items-baseline ${border} cursor-pointer`}
            onMouseOver={onMouseOver(d.key)}
            onMouseOut={onMouseOut}
          >
            <span
              className="mr1"
              style={{
                width: 10,
                height: 10,
                backgroundColor: colorMap(d.key),
                opacity,
              }}
            />
            <div
              className={`flex flex-auto justify-between ${active && 'bold'}`}
            >
              <span>
                {d.key}
              </span>
              <span className="monospace">
                {fmt(d.count)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  </div>;

NibrsDonutDetails.propTypes = {
  colorMap: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  selected: PropTypes.object,
};

export default NibrsDonutDetails;
