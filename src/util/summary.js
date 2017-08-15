import snakeCase from "lodash.snakecase";
import camelCase from "lodash.camelcase";

import { internal_offenses } from "../util/offenses";

const reshapeData = dataIn =>
  Object.assign(...dataIn.map(d => ({ [d.key]: d.results })));

// todo: refactor into action/reducer
// build all rates and stuff in reducer/action

const mungeSummaryData = (filter, summaries) => {
  if (!summaries || !summaries[filter.place]) return false;

  const keys = Object.keys(summaries);
  return summaries[filter.place]
    .filter(d => {
      if (!filter.since || !filter.until) return true;
      return d.year >= filter.since && d.year <= filter.until;
    })
    .sort((a, b) => a.year - b.year)
    .map(year => {
      const data = { year: +year.year };
      keys.forEach(key => {
        const source =
          key !== filter.place
            ? summaries[key].find(d => +d.year === data.year)
            : year;
        const normalizedCrime =
          filter.crime === "rape" ? "rape-legacy" : filter.crime;
        const apiCrime = snakeCase(normalizedCrime);
        data[key] = {
          population: source.population,
          [normalizedCrime]: {
            count: source[apiCrime],
            rate: source[apiCrime] / source.population * 100000
          }
        };

        if (filter.crime === "rape") {
          data[key]["rape-revised"] = {
            count: source.rape_revised,
            rate: source.rape_revised / source.population * 100000
          };
        }
      });
      return data;
    });
};

const computeTrend = (place, summaries) => {
  console.log("Compute Trend for place:" + place + " Data:", summaries);
  const locData = summaries[place];
  console.log("Location Data:", locData);
  const trendData = [];
  console.log("offnse Data:", internal_offenses);
  locData.forEach(d => {
    const yrData = {};
    yrData.year = d.year;
    yrData.population = d.population;
    const keys = Object.keys(d);
    keys.forEach(key => {
      console.log(snakeCase(key));
      if (internal_offenses.hasOwnProperty(snakeCase(key))) {
        const crimeData = {};
        const rate = {
          rate: d[key] * 10000 / d.population
        };
        //console.log("Computed Rate:", rate);
        crimeData.rate = rate;
        yrData[key] = crimeData;
        console.log("Year Data Obj:", yrData);
      }
    });
    trendData.push(yrData);
  });
  summaries.trendData = trendData;
  return summaries;
};
export { mungeSummaryData as default, computeTrend, reshapeData };
