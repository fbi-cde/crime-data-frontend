import pluralize from 'pluralize'
import startCase from 'lodash.startcase'

import offenses from './offenses'
import usa from './usa'

const basicTitle = 'The Crime Data Explorer publishes nation-wide crime data collected by the FBI in a digital format. The tool allows you to view trends and download bulk data allowing you to get a better understanding of crime across the country.'

const openGraphTags = state => {
  const { crime, place, since, until } = state.filters
  const isKnownCrime = offenses.includes(crime)
  const isKnownPlace = usa(place)
  let title = basicTitle

  if ((crime && isKnownCrime) && (place && isKnownPlace) && since && until) {
    title = `Reported ${pluralize(crime, 2)} in ${startCase(place)} from ${since} until ${until} as reported to the FBI UCR program`
  }

  return `<meta property="og:title" content="${title}" />`
}

const twitterCardTags = () => (
  `
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@fbi" />
  `.trim()
)

export default function createSharingMetaTagsFromState(state) {
  return `${openGraphTags(state)}\n${twitterCardTags(state)}`
}
