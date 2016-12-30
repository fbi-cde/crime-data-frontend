/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Glossary from './Glossary'
import Header from './Header'

const App = ({ appState, children, dispatch }) => (
  <div className='site'>
    <Header />
    <main className='site-main'>
      {children && React.cloneElement(children, { appState, dispatch })}
      <Glossary
        dispatch={dispatch}
        {...appState.glossary}
      />
    </main>
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
