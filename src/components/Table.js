import React from 'react'

const Table = ({ cls, data, headings }) => (
  <table className={`table ${cls}`}>
    <thead>
      <tr>
        {headings.map((heading, i) => (
          <th key={i}>{heading}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {row.map((datum, j) => (
            <td key={j}>{datum}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

Table.defaultProps = {
  cls: '',
  data: [],
  headings: [],
}

Table.propTypes = {
  cls: React.PropTypes.string,
  data: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),
  headings: React.PropTypes.arrayOf(React.PropTypes.string),
}

export default Table
