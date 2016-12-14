import React from 'react'

import Footer from './Footer'
import Navigation from './Navigation'

const App = props => (
  <div className='site'>
    <div className='site-wrap'>
      <Navigation />
      <main className='container'>
        { props.children }
      </main>
    </div>
    <Footer />
  </div>
)

export default App
