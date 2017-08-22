import snakeCase from 'lodash.snakecase';

import { slugify } from '../util/text';

const reshapeData = dataIn =>
  Object.assign(...dataIn.map(d => ({ [d.key]: d.results })));

// todo: refactor into action/reducer
// build all rates and stuff in reducer/action

const mungeSummaryData = (filter, summaries) => {
  if (!summaries || !summaries[filter.place]) return false;

  const keys = Object.keys(summaries);
  // return summaries[filter.place]
  //   .filter(d => {
  //     if (!filter.since || !filter.until) return true
  //     return d.year >= filter.since && d.year <= filter.until
  //   })
  //   .sort((a, b) => a.year - b.year)
  return keys.map(year => {
    const data = { year: +year.year };
    keys.forEach(key => {
      const source =
        key !== filter.place
          ? summaries[key].find(d => +d.year === data.year)
          : year;
      const normalizedCrime =
        filter.crime === 'rape' ? 'rape-legacy' : filter.crime;
      const apiCrime = snakeCase(normalizedCrime);
      data[key] = {
        population: source.population,
        [normalizedCrime]: {
          count: source[apiCrime],
          rate: source[apiCrime] / source.population * 100000,
        },
      };

      if (filter.crime === 'rape') {
        data[key]['rape-revised'] = {
          count: source.rape_revised,
          rate: source.rape_revised / source.population * 100000,
        };
      }
    });
    return data;
  });
};

const calculateRates = summaries => {
  const nonOffenseKeys = ['caveats', 'population', 'state_abbr', 'year'];
  const places = Object.keys(summaries).map(place => {
    const rates = summaries[place].map(yearly => {
      const offenses = Object.keys(yearly).filter(
        k => !nonOffenseKeys.includes(k),
      );
      const { population, year } = yearly;
      const withRates = offenses.map(o => ({
        [slugify(o)]: {
          count: yearly[o],
          rate: yearly[o] / population * 100000,
        },
      }));

      return Object.assign({ population, year }, ...withRates);
    });

    return {
      [place]: rates,
    };
  });

  return Object.assign(...places);
};

const filterByYear = (summaries, { since, until }) => {
  const places = Object.keys(summaries).map(place => {
    const filtered = summaries[place].filter(y => {
      const { year } = y;
      if (since && until && +year >= since && +year <= until) return true;
      else if (since && !until && since >= +year) return true;
      else if (!since && until && until <= +year) return true;
      return false;
    });
    return {
      [place]: filtered,
    };
  });

  console.log('places', places);

  return Object.assign(...places);
};

/*

starting:
{ place: [ { pop, year, offense: { rate, count }}]}

goal:
 [{ year, place: '', trend: { [offense]: { rate, count }, population }... } ]

*/

// take the summaries object, which has places as keys
// create an array of new objects, one for each year
// inside each new year object, should be the place names as keys as well as the year
// the values of those keys should be another object that has a key per offense and the place population that year
// each offense should have a value of another object with rate and count

const combinePlaces = (summaries, offenses = []) => {
  const places = Object.keys(summaries);
  const years = summaries[places[0]].map(y => y.year);
  const x = years.map(year =>
    Object.assign(
      { year },
      ...places.map(place => {
        const o = {};
        const yearData = summaries[place].find(y => y.year === year);
        offenses.forEach(offense => {
          o[offense] = yearData[offense];
        });
        return { [place]: { population: yearData.population, ...o } };
      }),
    ),
  );

  console.log('x!', x);

  return x;
};

//
// const computeTrend = (place, summaries) => {
//   console.log('Compute Trend for place:' + place + ' Data:', summaries)
//   const locData = summaries[place]
//   console.log('Location Data:', locData)
//   const trendData = []
//   console.log('offnse Data:', internal_offenses)
//   locData.forEach(d => {
//     const yrData = {}
//     yrData.year = d.year
//     yrData.population = d.population
//     const keys = Object.keys(d)
//     keys.forEach(key => {
//       console.log(snakeCase(key))
//       if (internal_offenses.hasOwnProperty(snakeCase(key))) {
//         const crimeData = {}
//         const rate = {
//           rate: d[key] * 10000 / d.population,
//         }
//         //console.log("Computed Rate:", rate);
//         crimeData.rate = rate
//         yrData[key] = crimeData
//         console.log('Year Data Obj:', yrData)
//       }
//     })
//     trendData.push(yrData)
//   })
//   summaries.trendData = trendData
//   return summaries
// }
export {
  mungeSummaryData as default,
  calculateRates,
  combinePlaces,
  filterByYear,
  reshapeData,
};
