import React from 'react'

import Footer from './Footer'
import Navigation from './Navigation'

const App = props => (
  <div>
    <Navigation />
    <main className='container'>
      { props.children }
    </main>
    <Footer />
  </div>
)

export default App
