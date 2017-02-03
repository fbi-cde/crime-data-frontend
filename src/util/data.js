const timeData = [
  ['2016-01-01', 5],
  ['2016-01-02', 7],
  ['2016-01-03', 3],
  ['2016-01-04', 5],
  ['2016-01-05', 10],
]

const timeData2 = [
  { date: '2008-01-01', foo: 12, bar: 7 },
  { date: '2009-01-01', foo: 6, bar: 5 },
  { date: '2010-01-01', foo: 5, bar: 7 },
  { date: '2011-01-01', foo: 7, bar: 2 },
  { date: '2012-01-01', foo: 4, bar: 4 },
  { date: '2013-01-01', foo: 5, bar: 6 },
  { date: '2014-01-01', foo: 10, bar: 4 },
  { date: '2015-01-01', foo: 12, bar: 3 },
]

const mapData = { ca: 1, fl: 1 }

const censusData = [
  {
    statistic: '11,613,423',
    label: 'residents',
  },
  {
    statistic: '74%',
    label: 'covered in UCR program',
  },
  {
    statistic: '831',
    label: 'law enforcement agencies',
  },
  {
    statistic: '25,992',
    label: 'officers',
  },
  {
    statistic: '447',
    label: 'officers per resident',
  },
]

const detailRelationshipData = [
  {
    key: 'Acquaintance',
    count: 10083,
  },
  {
    key: 'Unknown',
    count: 6358,
  },
  {
    key: 'Stranger',
    count: 3403,
  },
  {
    key: 'Boyfriend',
    count: 3313,
  },
  {
    key: 'Girlfriend',
    count: 2794,
  },
]

const detailLocationData = [
  {
    key: 'Residence/Home2',
    count: 37355,
  },
  {
    key: 'Highway/Road/Ally',
    count: 83165,
  },
  {
    key: 'Other/Unknown',
    count: 65737,
  },
  {
    key: 'Lot/Garage',
    count: 36629,
  },
  {
    key: 'Department/Discount Store',
    count: 19493,
  },
  {
    key: 'Service/Gas Station',
    count: 11546,
  },
  {
    key: 'Grocery/Supermarket',
    count: 11268,
  },
  {
    key: 'School-Elementary/Secondary',
    count: 9548,
  },
  {
    key: 'Commercial/Office Building',
    count: 8039,
  },
  {
    key: 'Restaurant',
    count: 7055,
  },
]

const detailOffenderAge = [
  {
    x0: 0,
    x1: 10,
    count: 2408,
  },
  {
    x0: 10,
    x1: 20,
    count: 76198,
  },
  {
    x0: 20,
    x1: 30,
    count: 109999,
  },
  {
    x0: 30,
    x1: 40,
    count: 67089,
  },
  {
    x0: 40,
    x1: 50,
    count: 44943,
  },
  {
    x0: 50,
    x1: 60,
    count: 20510,
  },
  {
    x0: 60,
    x1: 70,
    count: 4457,
  },
  {
    x0: 70,
    x1: 80,
    count: 1010,
  },
  {
    x0: 80,
    x1: 90,
    count: 234,
  },
  {
    x0: 90,
    x1: 100,
    count: 29,
  },
]

const detailOffenderRace = [
  {
    key: 'Asian',
    count: 836,
  },
  {
    key: 'Black or African American',
    count: 127140,
  },
  {
    key: 'American Indian or Alaska Native',
    count: 268,
  },
  {
    key: 'Native Hawaiian or Other Pacific Islander',
    count: 11,
  },
  {
    key: 'Unknown',
    count: 52601,
  },
  {
    key: 'White',
    count: 193505,
  },
]

const detailOffenderSex = [
  {
    key: 'Female',
    count: 96501,
  },
  {
    key: 'Male',
    count: 236783,
  },
  {
    key: 'Unknown',
    count: 41077,
  },
]

/* eslint quote-props: 0 */

const population = {
  'National': 300000000,
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
  'Murder',
  'Rape',
  'Robbery',
  'Aggravated Assault',
]

const propertyCrime = [
  'All Property Crime',
  'Arson',
  'Burglary',
  'Cargo Theft',
  'Larceny Theft',
  'Motor Vehicle Theft',
]

const otherCrime = [
  'Hate Crime',
  // 'Human Trafficking',
  'Law Enforcement Officers Killed and Assaulted (LEOKA)',
]

const crimeTypes = { violentCrime, propertyCrime, otherCrime }

export {
  censusData,
  crimeTypes,
  detailLocationData,
  detailOffenderAge,
  detailOffenderRace,
  detailOffenderSex,
  detailRelationshipData,
  mapData,
  population,
  timeData,
  timeData2,
}
