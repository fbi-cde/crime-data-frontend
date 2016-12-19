const timeData = [
  ['2016-01-01', 5],
  ['2016-01-02', 7],
  ['2016-01-03', 3],
  ['2016-01-04', 5],
  ['2016-01-05', 10],
]

const timeData2 = [
  { date: '2016-01-01', foo: 5, bar: 7 },
  { date: '2016-01-02', foo: 7, bar: 2 },
  { date: '2016-01-03', foo: 4, bar: 4 },
  { date: '2016-01-04', foo: 5, bar: 6 },
  { date: '2016-01-05', foo: 10, bar: 4 },
]

const mapData = {
  CA: 1,
  FL: 1,
}

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
    statistic: 831,
    label: 'law enforcement agencies',
  },
]

const detailData = [
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

export {
  timeData, timeData2, mapData,
  censusData, detailData,
}
