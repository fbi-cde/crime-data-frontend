/* eslint quote-props: 0 */

const population = {
  'United States': 300000000,
  'California': 38802500,
  'Texas': 26956958,
  'Florida': 19893297,
  'New York': 19746227,
  'Illinois': 12880580,
  'Pennsylvania': 12787209,
  'Ohio': 11594163,
  'Georgia': 10097343,
  'North Carolina': 9943964,
  'Michigan': 9909877,
  'New Jersey': 8938175,
  'Virginia': 8326289,
  'Washington': 7061530,
  'Massachusetts': 6745408,
  'Arizona': 6731484,
  'Indiana': 6596855,
  'Tennessee': 6549352,
  'Missouri': 6063589,
  'Maryland': 5976407,
  'Wisconsin': 5757564,
  'Minnesota': 5457173,
  'Colorado': 5355856,
  'Alabama': 4849377,
  'South Carolina': 4832482,
  'Louisiana': 4649676,
  'Kentucky': 4413457,
  'Oregon': 3970239,
  'Oklahoma': 3878051,
  'Connecticut': 3596677,
  'Iowa': 3107126,
  'Arkansas': 2994079,
  'Mississippi': 2984926,
  'Utah': 2942902,
  'Kansas': 2904021,
  'Nevada': 2839099,
  'New Mexico': 2085572,
  'Nebraska': 1881503,
  'West Virginia': 1850326,
  'Idaho': 1634464,
  'Hawaii': 1419561,
  'Maine': 1330089,
  'New Hampshire': 1326813,
  'Rhode Island': 1055173,
  'Montana': 1023579,
  'Delaware': 935614,
  'South Dakota': 853175,
  'North Dakota': 739482,
  'Alaska': 737732,
  'Vermont': 626011,
  'Wyoming': 584153,
}

const violentCrime = [
  'All Violent Crime',
  'Homicide',
  'Rape',
  'Robbery',
  'Aggravated Assault',
]

const propertyCrime = [
  'All Property Crime',
  'Arson',
  'Burglary',
  // 'Cargo Theft',
  'Larceny Theft',
  'Motor Vehicle Theft',
]

const crimeTypes = { violentCrime, propertyCrime }

export {
  crimeTypes,
  population,
}
