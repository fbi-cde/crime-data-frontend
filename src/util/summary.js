import { slugify } from '../util/text'

export const calculateRates = summaries => {
  const nonOffenseKeys = ['caveats', 'population', 'state_abbr', 'year']
  const places = Object.keys(summaries).map(place => {
    const rates = summaries[place].map(yearly => {
      const offenses = Object.keys(yearly).filter(
        k => !nonOffenseKeys.includes(k),
      )
      const { population, year } = yearly
      const withRates = offenses.map(o => ({
        [slugify(o)]: {
          count: yearly[o],
          rate: yearly[o] / population * 100000,
        },
      }))

      return Object.assign({ population, year }, ...withRates)
    })

    return {
      [place]: rates,
    }
  })

  return Object.assign(...places)
}

export const combinePlaces = (summaries, offenses = []) => {
  const places = Object.keys(summaries)
  const years = summaries[places[0]].map(y => y.year)

  return years.map(year =>
    Object.assign(
      { year },
      ...places.map(place => {
        const o = {}
        const yearData = summaries[place].find(y => y.year === year)
        offenses.forEach(offense => {
          o[offense] = yearData[offense]
        })

        return { [place]: { population: yearData.population, ...o } }
      }),
    ),
  )
}

export const filterByYear = (summaries, { since, until }) => {
  const places = Object.keys(summaries).map(place => {
    const filtered = summaries[place].filter(y => {
      const { year } = y
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

export const reshapeData = dataIn =>
  Object.assign(...dataIn.map(d => ({ [d.key]: d.results })))
