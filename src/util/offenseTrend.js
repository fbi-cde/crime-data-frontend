const parseOffenseTrend = (offenses, data, since, until) => {
  const keys = Object.keys(data)
  const parsedData = []

  let combineRape = false
  if (offenses.indexOf('violent_crime') > -1) {
    offenses = offenses.filter(e => e !== 'rape')
    offenses = offenses.filter(e => e !== 'violent_crime')
    combineRape = true
    offenses.push('rape-legacy')
    offenses.push('rape-revised')
  } else {
    offenses = offenses.filter(e => e !== 'property_crime')
  }

  let rape_legacy
  let rape_revised
  for (let i = 0; i < offenses.length; i++) {
    const obj = offenses[i].replace(/_/g, '-')
    const crimeTrend = {}
    crimeTrend.offense = obj
    for (let j = 0; j < keys.length; j++) {
      const place = keys[j]
      const placeArr = data[place]
      crimeTrend[place] = []
      // crimeTrend.place = place;
      for (let k = 0; k < placeArr.length; k++) {
        const trendData = placeArr[k]
        if (trendData) {
          if (trendData.year >= since && trendData.year <= until) {
            const crimeData = trendData[obj]
            const yrObj = {}
            yrObj.year = trendData.year
            yrObj.population = trendData.population
            yrObj.rate = crimeData.rate
            yrObj.count = crimeData.count
            crimeTrend[place].push(yrObj)
          }
        }
      }
    }
    parsedData.push(crimeTrend)
    if (obj === 'rape-legacy' && combineRape) {
      rape_legacy = crimeTrend
    } else if (obj === 'rape-revised' && combineRape) {
      rape_revised = crimeTrend
    }
  }
  // Combine Rape
  /*
  if (combineRape) {
    const rapeOffense = {};
    rapeOffense.offense = 'rape';
    rapeOffense.rape_legacy = rape_legacy;
    rapeOffense.rape_revised = rape_revised;
    parsedData = parsedData.filter(e => e.offense !== 'rape-legacy');
    parsedData = parsedData.filter(e => e.offense !== 'rape-revised');
    parsedData.push(rapeOffense);
  }
  */

  console.log('OffenseTrend: parsed Offense Data:', parsedData)
  // Remove Crime Type Man Catagory

  return parsedData
}
export default parseOffenseTrend
