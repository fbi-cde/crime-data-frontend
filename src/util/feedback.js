/* eslint no-console: 0 */

export const hasThreatKeyword = (txt, terms) => {
  if (!terms || !terms.map) return false
  return terms
    .map(t => txt.toLowerCase().includes(t.toLowerCase()))
    .includes(true)
}

export const notifyOfThreat = ({ html_url }) => {
  console.log('notifying with issue:', html_url)
}
