const parseOffenseTrend = (offenses, data) => {
  const keys = Object.keys(data);
  const parsedData = [];
  offenses = offenses.filter(e => e !== 'rape');
  offenses = offenses.filter(e => e !== 'violent-crime');

  offenses.push('rape-legacy');
  offenses.push('rape-revised');
  for (let i = 0; i < offenses.length; i++) {
    const obj = offenses[i].replace('_', '-');
    const crimeTrend = {};
    crimeTrend.offense = obj;
    for (let j = 0; j < keys.length; j++) {
      const place = keys[j];
      const placeArr = data[place];
      crimeTrend[place] = [];
      // crimeTrend.place = place;
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
