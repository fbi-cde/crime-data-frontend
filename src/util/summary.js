const mungeSummaryData = ({ crime, summaries, place, since, until }) => {
  if (!summaries || !summaries[place]) return false

  const keys = Object.keys(summaries)
  return summaries[place]
    .filter(d => {
      if (!since || !until) return true
      return d.year >= since && d.year <= until
    })
    .map(year => {
      const data = { date: year.year }
      keys.forEach(key => {
        const source = key !== place
          ? summaries[key].find(d => d.year === data.date)
          : year
        data[key] = {
          pop: source.population,
          count: source[crime],
          rate: (source[crime] / source.population) * 100000,
        }
      })
      return data
    })
}

export default mungeSummaryData
