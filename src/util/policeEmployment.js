export const reshapeData = dataIn => Object.assign(...dataIn.map(d => ({ [d.key]: d.results })))

export const peFilterByYear = (policeEmploymentData, since, until) => {
  const places = Object.keys(policeEmploymentData).map(place => {
    const filtered = policeEmploymentData[place].filter(y => {
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

export const peCombinePlaces = (policeEmploymentData, offenses = []) => {
  const places = Object.keys(policeEmploymentData)
  const years = policeEmploymentData[places[0]].map(y => y.data_year)
  return years.map(year =>
    Object.assign(
      { year },
      ...places.map(place => {
        const o = {}
        const yearData = policeEmploymentData[place].find(y => y.data_year === year)
        offenses.forEach(offense => {
          const off = {}
          off.count = yearData.total_pe_ct
          off.rate = yearData.pe_ct_per_1000
          off.details = [
            { key: 'Male Officers', count: yearData.male_officer_ct },
            { key: 'Female Officers', count: yearData.female_officer_ct },
            { key: 'Male Civilians', count: yearData.male_civilian_ct },
            { key: 'Female Civilians', count: yearData.female_civilian_ct }
          ]
          o[offense] = off
        })
        return { [place]: { population: yearData.population, ...o } }
      }),
    ),
  )
}
