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
    label: 'peace officers',
  },
  {
    statistic: '447',
    label: 'peace officers per resident',
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
    key: '10',
    count: 2408,
  },
  {
    key: '20',
    count: 76198,
  },
  {
    key: '30',
    count: 109999,
  },
  {
    key: '40',
    count: 67089,
  },
  {
    key: '50',
    count: 44943,
  },
  {
    key: '60',
    count: 20510,
  },
  {
    key: '70',
    count: 4457,
  },
  {
    key: '80',
    count: 1010,
  },
  {
    key: '90',
    count: 234,
  },
  {
    key: '100',
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

export {
  timeData, timeData2, mapData, censusData,
  detailLocationData,
  detailOffenderAge,
  detailOffenderRace,
  detailOffenderSex,
  detailRelationshipData,
}
