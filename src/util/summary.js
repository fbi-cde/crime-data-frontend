import snakeCase from 'lodash.snakecase'

// todo: refactor into action/reducer
// build all rates and stuff in reducer/action

const mungeSummaryData = ({ crime, summaries, place, since, until }) => {
  if (!summaries || !summaries[place]) return false

  const keys = Object.keys(summaries)
  return summaries[place]
    .filter(d => {
      if (!since || !until) return true
      return d.year >= since && d.year <= until
    })
    .sort((a, b) => a.year - b.year)
    .map(year => {
      const data = { year: +year.year }
      keys.forEach(key => {
        const source =
          key !== place ? summaries[key].find(d => +d.year === data.year) : year
        const normalizedCrime = crime === 'rape' ? 'rape-legacy' : crime
        const apiCrime = snakeCase(normalizedCrime)

        data[key] = {
          population: source.population,
          [normalizedCrime]: {
            count: source[apiCrime],
            rate: source[apiCrime] / source.population * 100000,
          },
        }

        if (crime === 'rape') {
          data[key]['rape-revised'] = {
            count: source.rape_revised,
            rate: source.rape_revised / source.population * 100000,
          }
        }
      })
      return data
    })
}

export default mungeSummaryData
