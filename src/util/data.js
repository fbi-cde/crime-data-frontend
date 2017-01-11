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
