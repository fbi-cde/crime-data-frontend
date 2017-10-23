const reshapeData = data => {
  return data[0];
}

const lookupRegion = (place, placeType) => {
  console.log("Lookup Region:", place, placeType)
  if (!this.state.regionData) return null

  // TODO: better check for proper agency ids
  if (placeType === 'region') return false;

  return Object.filter(this.state.regionData, d => d.region_name === place);
}

export { reshapeData as default, lookupRegion}
