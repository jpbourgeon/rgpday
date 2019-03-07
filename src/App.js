import React from 'react'
import { Router, Location } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { loadReCaptcha } from 'recaptcha-v3-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import withRoot from './withRoot'
import Loadable from './components/Loadable'
import Navigation from './components/Navigation'

const Default = () => (<Loadable component='components/Default' />)
const Home = () => (<Loadable component='components/Home' />)
const About = () => (<Loadable component='components/About' />)
const Contact = () => (<Loadable component='components/Contact' />)
const ProtectedRoutes = () => (<Loadable component='ProtectedRoutes' />)
const ReCaptcha = () => (<Loadable component='components/ReCaptcha/GetReCaptchaTokens' />)

const styles = () => ({
  '@global': {
    '.grecaptcha-badge': {
      visibility: 'hidden'
    }
  }
})

const routesWithBackButton = []

class App extends React.Component {
  componentDidMount () {
    loadReCaptcha({
      key: '6LedLpMUAAAAAG8Ai4M4x9wTcIs4rPmvYV82a7Yh',
      id: 'rgpday.com'
    })
  }

  render () {
    return (
      <React.Fragment>

        <CssBaseline />

        <Location>
          {({ location }) => {
            return (
              <Navigation minified={(routesWithBackButton.includes(location.pathname))} />
            )
          }}
        </Location>

        <Router>
          <Default default />
          <Home path='/' />
          <About path='about' />
          <Contact path='/contact' />
          <ProtectedRoutes path='/session' />
          <ReCaptcha path='/recaptcha' />
        </Router>

      </React.Fragment>
    )
  }
}

export default withRoot(withStyles(styles)(App))
