import React from 'react'

import Footer from './Footer'
import Glossary from './Glossary'
import Navigation from './Navigation'

const App = ({ children }) => (
  <div className='site'>
    <div className='site-wrap'>
      <Navigation />
      <main>{ children }</main>
    </div>
    <Glossary />
    <Footer />
  </div>
)

export default App
