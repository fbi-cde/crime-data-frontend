/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Glossary from './Glossary'
import Navigation from './Navigation'
import Sidebar from './Sidebar'

const App = ({ appState, children, dispatch }) => (
  <div className='site'>
    <Navigation />
    <div className='site-body'>
      <main className='site-content'>
        {children && React.cloneElement(children, { appState, dispatch })}
      </main>
      <Sidebar dispatch={dispatch} />
      <Glossary
        dispatch={dispatch}
        {...appState.glossary}
      />
    </div>
    <Footer />
  </div>
)

App.propTypes = {
  appState: React.PropTypes.object,
  dispatch: React.PropTypes.func,
}

const mapStateToProps = state => ({ appState: state })
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(App)
