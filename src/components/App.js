import React from 'react'
import axios from 'axios'

import Glossary from './Glossary'
import Header from './Header'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      incidents: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('data/incidents.json')
      .then(response => { this.setState({ incidents: response.data.slice(0, 10) }) })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { incidents } = this.state

    return (
      <div>
        <Header />
        <div className='p2 container'>
          {incidents.map((d, i) => <p key={i}>{JSON.stringify(d)}</p>)}
        </div>
        <Glossary />
      </div>
    )
  }
}

export default App
