import React from 'react'
import Amplify from '@aws-amplify/core'
import { Router } from '@reach/router'
import Loadable from 'react-loadable'
import { withStyles } from '@material-ui/core/styles'
import { loadReCaptcha } from 'recaptcha-v3-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import awsmobile from './aws-exports'
import withRoot from './withRoot'
import Loading from './components/LoadingWithAppBar'

Amplify.configure(awsmobile)

const LoadableDefault = Loadable({
  loader: () => import('./components/Default'),
  loading: Loading
})

const LoadableHome = Loadable({
  loader: () => import('./components/Home'),
  loading: Loading
})

const LoadableAbout = Loadable({
  loader: () => import('./components/About'),
  loading: Loading
})

const LoadableContact = Loadable({
  loader: () => import('./components/Contact'),
  loading: Loading
})

const LoadableProtectedRoutes = Loadable({
  loader: () => import('./ProtectedRoutes'),
  loading: Loading
})

const styles = () => ({
  '@global': {
    '.grecaptcha-badge': {
      visibility: 'hidden'
    }
  }
})

class App extends React.Component {
  componentDidMount () {
    loadReCaptcha({
      key: '6LedLpMUAAAAAG8Ai4M4x9wTcIs4rPmvYV82a7Yh',
      id: 'rgpday.com/contact'
    })
  }

  render () {
    return (
      <React.Fragment>

        <CssBaseline />

        <Router>
          <LoadableDefault default />
          <LoadableHome path='/' />
          <LoadableAbout path='/about' />
          <LoadableContact path='/contact' />
          <LoadableProtectedRoutes path='/session' />
          <Loading path='/loading' />
        </Router>

      </React.Fragment>
    )
  }
}

export default withRoot(withStyles(styles)(App))
