import React from 'react'

const Census = ({ data, source }) => (
  <div className='p2 bg-darken-1 rounded navy'>
    <h4 className='m0'>Census Overview</h4>
    <ul className='list-style-none my2 p0 h5'>
      { data.map((d, i) => (
        <li key={i}>
          <strong className='h4 monospace'>{d.statistic}</strong> { d.label }
        </li>
      ))}
    </ul>
    <a href={source} className='block h6 italic navy'>Source: Census data</a>
  </div>
)

Census.defaultProps = {
  source: 'https://census.gov',
}

Census.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  source: React.PropTypes.string,
}

export default Census
