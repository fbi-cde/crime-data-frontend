import snakeCase from "lodash.snakecase";

export const reshapeData = dataIn =>
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

export default mungeSummaryData;
