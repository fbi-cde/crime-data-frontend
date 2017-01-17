import React from 'react'

const Census = ({ data, source, year }) => (
  <div className='px2 navy border-left border-navy'>
    <h3 className='m0 h4 caps'>Census Data, {year}</h3>
    <ul className='list-style-none my2 p0'>
      { data.map((d, i) => (
        <li key={i}>
          <strong className='h3 monospace'>{d.statistic}</strong> { d.label }
        </li>
      ))}
    </ul>
    <a href={source} className='block h5 italic navy'>Source: Census data, {year}</a>
  </div>
)

Census.defaultProps = {
  source: 'https://census.gov',
}

Census.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  source: React.PropTypes.string,
  year: React.PropTypes.number,
}

export default Census
