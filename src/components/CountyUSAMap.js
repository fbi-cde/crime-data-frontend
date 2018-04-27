import React from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'


import d3CountyData from '../../public/data/us-albers-counties.json'
import d3Data from '../../public/data/usa-state-county-svg.json'


class CountyUSAMap extends React.Component {
    constructor() {
      super()
      this.state = {
        countyData: d3CountyData,
        usData: d3Data
      }
    }

    projection(height, width) {
      return geoAlbersUsa()
    }

    render() {
    // const countyGeojson = feature(this.state.countyData, this.state.countyData.objects.collection).features;
    const countyGeojson = feature(this.state.usData, this.state.usData.objects.counties).features;
    const statesGeojson = feature(this.state.usData, this.state.usData.objects.states, (a, b) => a !== b).features;

    const { width, height } = this.props;
    const path = d3.geoPath();

    console.log('width,height:', width, height)

    console.log('countyGeojson:', countyGeojson)
    console.log('statesGeojson:', statesGeojson)

    return (
     <div>
      <svg
        className={'cursor-pointer usa-map'}
        viewBox="0 0 959 593"
        preserveAspectRatio="xMidYMid"
      >
        <g className="counties">
        {
          countyGeojson.map((d, i) => (
            <path
              id={d.id}
              key={`county-${i}-${d.properties.fips}`}
              d={path.projection(this.projection(height, width))(d)}
              className="country fill-blue-light"
              stroke="#FFFFFF"
              strokeWidth={0.5}
            />
          ))
        }
        </g>

        <g className="states">
        {
          statesGeojson.map((d, i) => (
            <path
              id={d.id}
              d={path.projection(this.projection(height, width))(d)}
              className="states"
              fill={`rgba(38,50,56,${1 / statesGeojson.length * i})`}
              stroke="#FFFFFF"
              strokeWidth={0.5}
            />
          ))
        }
        </g>


      </svg>
      </div>);
    }
}

export default CountyUSAMap
