import React from 'react'

import Navigation from './Navigation'

const App = props => (
  <div>
    <Navigation />
    <main className='container'>
      { props.children }
    </main>
  </div>
)

export default App
