import assaultContent from '../../content/crimes/aggravated-assault.yml'
import arsonContent from '../../content/crimes/arson.yml'
import burglaryContent from '../../content/crimes/burglary.yml'
import cargoTheftContent from '../../content/crimes/cargo-theft.yml'
import hateCrimeContent from '../../content/crimes/hate-crime.yml'
import homicideContent from '../../content/crimes/homicide.yml'
import larcenyContent from '../../content/crimes/larceny.yml'
import leokaContent from '../../content/crimes/leoka.yml'
import locationContent from '../../content/locations.yml'
import mvtContent from '../../content/crimes/motor-vehicle-theft.yml'
import propertyCrimeContent from '../../content/crimes/property-crime.yml'
import rapeContent from '../../content/crimes/rape.yml'
import robberyContent from '../../content/crimes/robbery.yml'
import violentCrimeContent from '../../content/crimes/violent-crime.yml'

const content = {
  locations: { ...locationContent },
  crimes: {
    'aggravated-assault': assaultContent,
    arson: arsonContent,
    burglary: burglaryContent,
    'cargo-theft': cargoTheftContent,
    'hate-crime': hateCrimeContent,
    homicide: homicideContent,
    larceny: larcenyContent,
    leoka: leokaContent,
    'motor-vehicle-theft': mvtContent,
    'property-crime': propertyCrimeContent,
    rape: rapeContent,
    robbery: robberyContent,
    'violent-crime': violentCrimeContent,
  },
}

export const generateCrimeReadme = ({ crime, title = 'README' }) => {
  const crimeJson = content.crimes[crime]
  const caveats = crimeJson.caveats
    .map(c => `### ${c.heading}\n\n${c.text}`)
    .join('\n\n')
  const links = crimeJson.links.map(l => `* [${l.text}](${l.url})`).join('\n')

  return `# ${title}\n\n## Caveats\n\n${caveats}\n\n## Links\n\n${links}`
}

export default content
