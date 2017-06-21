export const reshapeData = dataIn =>
  Object.assign(...dataIn.map(d => ({ [d.key]: d.results })))

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
      const data = { date: year.year }
      keys.forEach(key => {
        const source = key !== place
          ? summaries[key].find(d => d.year === data.date)
          : year
        const normalizedCrime = crime === 'rape' ? 'rape_legacy' : crime

        data[key] = {
          pop: source.population,
          [normalizedCrime]: {
            count: source[normalizedCrime],
            rate: source[normalizedCrime] / source.population * 100000,
          },
        }

        if (crime === 'rape') {
          data[key].rape_revised = {
            count: source.rape_revised,
            rate: source.rape_revised / source.population * 100000,
          }
        }
      })
      return data
    })
}

export default mungeSummaryData
