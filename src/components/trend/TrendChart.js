/* eslint-disable react/jsx-no-bind */

import { bisector, extent, max } from 'd3-array';
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';
import React from 'react';

import TrendChartDetails from './TrendChartDetails';
import TrendChartHover from './TrendChartHover';
import TrendChartLineSeries from './TrendChartLineSeries';
import TrendChartRapeAnnotate from './TrendChartRapeAnnotate';
import TrendChartRapeLegend from './TrendChartRapeLegend';
import XAxis from '../XAxis';
import YAxis from '../YAxis';

class TrendChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: null, svgParentWidth: null, yearSelected: null };
    this.getDimensions = throttle(this.getDimensions, 20);
  }

  componentDidMount() {
    this.getDimensions();
    window.addEventListener('resize', this.getDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions);
  }

  getDimensions = () => {
    if (this.svgParent) {
      this.setState({ svgParentWidth: this.svgParent.clientWidth });
    }
  };

  createSeries = (crimes, data, places) => {
    const [dates, rates] = [[], []];
    const series = places
      .map(place =>
        crimes.map(crime => {
          const gaps = [];
          const segments = [[]];
          const values = data
            .filter(d => d[place][crime] && d[place][crime].count)
            .map(d => ({
              date: d.date,
              year: d.year,
              population: d[place].population,
              ...d[place][crime],
            }));

          values.forEach(d => {
            if (d.count && d.count !== 0) {
              segments[segments.length - 1].push(d);
            } else {
              gaps.push(d.year);
              segments.push([]);
            }
            dates.push(d.date);
            rates.push(d.rate);
          });

          return { crime, gaps, place, segments, values };
        }),
      )
      .reduce((a, n) => a.concat(n), []);

    return { dates, rates, series };
  };

  updateYear = year => {
    this.setState({ yearSelected: year });
  };

  rememberValue = e => {
    // get mouse x position, relative to container
    const node = e.target;
    const rect = node.getBoundingClientRect();
    const xRel = e.clientX - rect.left - node.clientLeft;

    this.setState({ hover: { x: xRel / rect.width }, yearSelected: null });
  };

  render() {
    const { crime, colors, data, places, since, size, until } = this.props;
    const { hover, svgParentWidth, yearSelected } = this.state;

    const { margin } = size;
    const color = scaleOrdinal(colors);
    const svgWidth = svgParentWidth || size.width;
    const svgHeight = svgWidth / 2.25;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    const xPad = svgWidth < 500 ? 15 : 30;
    const parse = timeParse('%Y');

    const isRape = crime === 'rape';
    const crimes = [isRape ? 'rape-legacy' : crime];
    if (isRape) crimes.push('rape-revised');

    const dataByYear = data.map(d => ({ ...d, date: parse(d.year) }));
    const newSeries = this.createSeries(crimes, dataByYear, places);
    const { dates, rates, series } = newSeries;

    const x = scaleTime().domain(extent(dates)).range([xPad, width - xPad]);
    const y = scaleLinear().domain([0, max(rates)]).range([height, 0]).nice();

    let active = series.map(({ crime: c, place, values }) => ({
      crime: c,
      place,
      ...(yearSelected
        ? values.find(v => v.year === yearSelected)
        : values[values.length - 1]),
    }));

    if (!yearSelected && hover) {
      const bisectDate = bisector(d => d.date).left;
      const x0 = x.invert(hover.x * width);
      active = series
        .map(({ crime: c, place, values }) => {
          if (x0.getFullYear() < 2013 && c === 'rape-revised') return null;
          const i = bisectDate(values, x0, 1);
          const [d0, d1] = [values[i - 1], values[i]];
          const pt = d0 && d1 && x0 - d0.date > d1.date - x0 ? d1 : d0;
          return { crime: c, place, ...pt };
        })
        .filter(s => s);
    }

    const dataHover = places
      .map(place =>
        active.filter(
          a =>
            a.place === place &&
            a.crime !== 'rape-revised' &&
            a.rate &&
            a.count,
        ),
      )
      .reduce((a, n) => a.concat(n), []);

    return (
      <div>
        <TrendChartDetails
          active={active}
          colors={colors}
          crime={crime}
          keys={places}
          since={since}
          updateYear={this.updateYear}
          until={until}
        />
        <div className="mb2 clearfix">
          <div className="sm-col mb1 sm-m0 fs-10 bold monospace black">
            Rate per 100,000 people, by year
          </div>
          {crime === 'rape' && <TrendChartRapeLegend />}
        </div>
        {/* eslint-disable no-return-assign */}
        <div className="mb3 col-12" ref={ref => (this.svgParent = ref)}>
          <svg width={svgWidth} height={svgHeight} style={{ maxWidth: '100%' }}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <XAxis
                active={active[0].date}
                scale={x}
                height={height}
                tickCt={svgWidth < 500 ? 4 : 8}
              />
              <YAxis scale={y} width={width} />
              <TrendChartLineSeries color={color} series={series} x={x} y={y} />
              {until > 2013 &&
                crime === 'rape' &&
                <TrendChartRapeAnnotate height={height} x={x} />}
              <TrendChartHover
                color={color}
                data={dataHover}
                height={height}
                x={x}
                y={y}
              />
              <rect
                width={width}
                height={height}
                fill="none"
                pointerEvents="all"
                onMouseMove={this.rememberValue}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

TrendChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
};

TrendChart.defaultProps = {
  size: {
    width: 735,
    margin: { top: 16, right: 0, bottom: 24, left: 32 },
  },
  colors: ['#ff5e50', '#95aabc', '#52687d'],
};

export default TrendChart;
