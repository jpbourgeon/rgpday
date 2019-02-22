import React from 'react'
import { Router } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { loadReCaptcha } from 'recaptcha-v3-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import withRoot from './withRoot'
import Default from './components/Default'
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Login from './components/Login'

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
          <Default default />
          <Home path='/' />
          <About path='/about' />
          <Contact path='/contact' />
          <Login path='/login' />
        </Router>

      </React.Fragment>
    )
  }
}

export default withRoot(withStyles(styles)(App))
