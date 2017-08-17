const parseOffenseTrend = (offenses, data) => {
  console.log('parseOffenseTrend:', offenses, data);
  const keys = Object.keys(data);
  console.log('keys:', keys);
  const parsedData = [];
  offenses = offenses.filter(e => e !== 'rape');
  offenses.push('rape-legacy');
  offenses.push('rape-revised');
  for (let i = 0; i < offenses.length; i++) {
    const obj = offenses[i].replace('_', '-');
    const crimeTrend = {};
    crimeTrend.offense = obj;
    console.log('Object:', obj);
    for (let j = 0; j < keys.length; j++) {
      const place = keys[j];
      const placeArr = data[place];
      crimeTrend[place] = [];
      // crimeTrend.place = place;
      console.log('place:', place, placeArr);
      for (let k = 0; k < placeArr.length; k++) {
        const trendData = placeArr[k];
        if (trendData) {
          const crimeData = trendData[obj];
          const yrObj = {};
          yrObj.year = trendData.year;
          yrObj.population = trendData.population;
          yrObj.rate = crimeData.rate;
          yrObj.count = crimeData.count;
          crimeTrend[place].push(yrObj);
        }
      }
    }
    parsedData.push(crimeTrend);
  }
  console.log('parsed Offense Data:', parsedData);
  return parsedData;
};
export default parseOffenseTrend;
