import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import React from 'react';

import NibrsHistogramDetails from './NibrsHistogramDetails';
import XAxis from '../XAxis';
import { slugify } from '../../util/text';

class NibrsHistogram extends React.Component {
  state = { hover: null };

  handleClick = d => () => {
    this.setState(prevState => ({ hover: prevState.hover ? null : d }));
  };

  rememberValue = d => () => {
    this.setState({ hover: d });
  };

  forgetValue = () => {
    this.setState({ hover: null });
  };

  render() {
    const { data, margin, noun, size, title, xLabel } = this.props;
    const { hover } = this.state;

    const id = slugify(`histogram-${title}`);
    const height = size.height - margin.top - margin.bottom;
    const width = size.width - margin.left - margin.right;
    const xPadding = 20;

    const bins = data.map(d => ({
      x0: +d.binStart,
      x1: +d.binEnd + 1,
      ct: +d.count,
    }));

    const maxVal = max(bins, d => d.ct);
    const total = data.map(d => d.count).reduce((a, n) => a + n, 0);

    const x = scaleLinear()
      .domain([0, 100])
      .range([0 + xPadding, width - xPadding]);

    const y = scaleLinear().domain([0, maxVal]).range([height, 0]);

    return (
      <div className="mb2 pb2 border-bottom border-blue-light" id={id}>
        <div className="mb2 blue bold">
          {title}
        </div>
        <div>
          <svg
            preserveAspectRatio="xMidYMid"
            viewBox={`0 0 ${size.width} ${size.height}`}
            style={{ width: '100%', height: '100%' }}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {bins.map((d, i) => {
                const rectWidth = x(bins[0].x1) - x(bins[0].x0) - 1;
                const fill =
                  hover === null || d.x0 === hover.x0 ? '#ff5e50' : '#f4dfdd';

                return (
                  <g
                    key={i}
                    className="cursor-pointer"
                    transform={`translate(${x(d.x0)}, 0)`}
                  >
                    <rect
                      width={rectWidth}
                      height={height}
                      x="1"
                      fill="#fff"
                      pointerEvents="all"
                      onClick={this.handleClick(d)}
                      onMouseOver={this.rememberValue(d)}
                      onMouseOut={this.forgetValue}
                    />
                    <rect
                      width={rectWidth}
                      height={height - y(d.ct)}
                      x="1"
                      y={y(d.ct)}
                      fill={fill}
                      pointerEvents="all"
                      onClick={this.handleClick(d)}
                      onMouseOver={this.rememberValue(d)}
                      onMouseOut={this.forgetValue}
                    />
                  </g>
                );
              })}
              <XAxis height={height} scale={x} />
              <g className="axis" transform={`translate(0, ${height})`}>
                <line x2={width} strokeWidth="1" />
              </g>
            </g>
          </svg>
          {xLabel &&
            <div className="mb1 fs-10 bold caps red center">
              {xLabel}
            </div>}
          <NibrsHistogramDetails data={hover || { ct: total }} noun={noun} />
        </div>
      </div>
    );
  }
}

NibrsHistogram.defaultProps = {
  margin: { top: 5, right: 10, bottom: 24, left: 5 },
  size: { width: 360, height: 160 },
};

NibrsHistogram.propTypes = {
  noun: PropTypes.string.isRequired,
  xLabel: PropTypes.string,
};

export default NibrsHistogram;
