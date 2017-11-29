import snakecase from 'lodash.snakecase'

export const getYearData = (summaries, place, minYr) => summaries[place].filter(
    data => data.year === minYr
  )

  export const reshapeData = dataIn => Object.assign(...dataIn.map(d => ({ [d.key]: d.results })))

  export const summarizedFilterByYear = (summarized, since, until) => {
    const places = Object.keys(summarized).map(place => {
      const filtered = summarized[place].filter(y => {
        const year = y.data_year
        if (since && until && +year >= since && +year <= until) return true
        else if (since && !until && since <= +year) return true
        else if (!since && until && until >= +year) return true
        return false
      })
      return {
        [place]: filtered,
      }
    })

    return Object.assign(...places)
  }

  export const summarizedCombinePlaces = (summaries, offenses = []) => {
    const places = Object.keys(summaries)
    const years = summaries[places[0]].map(y => y.data_year)
    return years.map(year =>
      Object.assign(
        { year },
        ...places.map(place => {
          const o = {}
          const yearData = summaries[place].find(y => y.data_year === year)
          offenses.forEach(offense => {
            const off = {}
            off.count = yearData[snakecase(offense)]
            off.rate = yearData[`${snakecase(offense)}_rate`]
            o[offense] = off
          })
          return { [place]: { population: yearData.population, ...o } }
        }),
      ),
    )
  }
