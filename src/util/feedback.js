export const hasThreatKeyword = (txt, terms) => {
  if (!terms || !terms.map) return false
  return terms
    .map(t => txt.toLowerCase().includes(t.toLowerCase()))
    .includes(true)
}
