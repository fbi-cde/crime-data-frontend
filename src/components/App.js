/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import Disclaimer from './Disclaimer'
import Footer from './Footer'
import Glossary from './Glossary'
import Header from './Header'

const App = ({ appState, children, dispatch, location }) => (
  <div className='site'>
    <Disclaimer />
    <Header location={location} />
    <main className='site-main'>
      {children && React.cloneElement(children, { appState, dispatch })}
    </main>
    <Glossary
      dispatch={dispatch}
      {...appState.glossary}
    />
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
