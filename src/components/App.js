/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Glossary from './Glossary'
import Navigation from './Navigation'

const App = props => {
  const appState = props.appState
  const dispatch = props.dispatch

  return (
    <div className='site'>
      <div className='site-wrap'>
        <Navigation />
        <main className='container'>
          {props.children}
        </main>
      </div>
      <Glossary />
      <Footer />
    </div>
  )
}

App.propTypes = {
  appState: React.PropTypes.object,
  dispatch: React.PropTypes.func,
}

const mapStateToProps = state => ({ appState: state })
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(App)
