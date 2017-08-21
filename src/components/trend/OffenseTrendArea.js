import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import startCase from 'lodash.startcase';
import { bisector, extent, max } from 'd3-array';
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import PropTypes from 'prop-types';
import React from 'react';

import { crimeTypes } from '../../util/offenses';
import TrendChartDetails from './TrendChartDetails';
import TrendChartHover from './TrendChartHover';
import TrendChartLineSeries from './TrendChartLineSeries';
import TrendChartRapeAnnotate from './TrendChartRapeAnnotate';
import TrendChartRapeLegend from './TrendChartRapeLegend';
import OffenseTrendCard from './OffenseTrendCard';
import offenseTrend from '../../util/offenseTrend';
import XAxis from '../XAxis';
import YAxis from '../YAxis';

class OffenseTrendArea extends React.Component {
  render() {
    const {
      crime,
      place,
      places,
      placeType,
      since,
      summaries,
      until,
    } = this.props;

    if (!['violent-crime', 'property-crime'].includes(crime)) return null;
    const crimeType = camelCase(crime);
    const crimeIds = crimeTypes[crimeType].map(t => snakeCase(t.id || t));
    const parsedData = offenseTrend(crimeIds, summaries.data, since, until);

    return (
      <div className="clearfix mxn1">
        {parsedData.map((d, i) => {
          const cls = i % 2 === 0 ? 'clear-left' : '';
          return (
            <div key={i} className={`col col-12 sm-col-6 mb2 px1 ${cls}`}>
              <OffenseTrendCard
                trendData={d}
                since={since}
                until={until}
                places={places}
                place={place}
                since={since}
                until={until}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

OffenseTrendArea.propTypes = {
  summaries: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
};

OffenseTrendArea.defaultProps = {
  size: {
    width: 250,
    margin: { top: 16, right: 0, bottom: 24, left: 32 },
  },
  colors: ['#ff5e50', '#95aabc', '#52687d'],
};

export default OffenseTrendArea;
