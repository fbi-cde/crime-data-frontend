import React from 'react'
import axios from 'axios'

import BarChart from './BarChart'
import Glossary from './Glossary'
import Header from './Header'
import TimeChart from './TimeChart'

const data = [
  ['2016-01-01', 5],
  ['2016-01-02', 7],
  ['2016-01-03', 3],
  ['2016-01-04', 5],
  ['2016-01-05', 10],
];

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { incidents: [] }
  }

  componentDidMount() {
    axios.get('data/incidents.json')
      .then(response => { this.setState({ incidents: response.data.slice(0, 10) }) })
  }

  render() {
    return (
      <div>
        <Header />
        <div className='p2 container'>
          <div className='border'>
            <TimeChart data={data} />
          </div>
          <div className='border'>
            <BarChart data={data} labels={false} />
          </div>
        </div>
        <Glossary />
      </div>
    )
  }
}

export default App
