/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import BetaBanner from './BetaBanner'
import Disclaimer from './Disclaimer'
import Footer from './Footer'
import Glossary from './Glossary'
import Header from './Header'


const App = ({ appState, children, dispatch, location }) => (
  <div className='site'>
    <Disclaimer />
    <BetaBanner />
    <Header location={location} />
    <main className='site-main'>
      {children && React.cloneElement(children, { appState, dispatch })}
    </main>
    <Glossary
      dispatch={dispatch}
      {...appState.glossary}
    />
    <Footer />
    {process.env.NODE_ENV !== 'production' && (
      <button
        type='button'
        className='fixed bottom-0 left-0 m1 px-tiny py0 btn btn-primary bg-red-bright'
        onClick={() => window.localStorage.clear()}
      >
        ⟲
      </button>
    )}
  </div>
)

App.propTypes = {
  appState: React.PropTypes.object,
  dispatch: React.PropTypes.func,
}

const mapStateToProps = state => ({ appState: state })
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(App)
