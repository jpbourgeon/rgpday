import React from 'react'
import { Router, Location } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { loadReCaptcha } from 'recaptcha-v3-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import withRoot from 'src/withRoot'
import Loadable from 'src/components/Loadable'
import Navigation from 'src/components/Navigation'

const ReCaptcha = (props) => (<Loadable loadablePath='components/ReCaptcha/GetReCaptchaTokens' {...props} />)
const Default = (props) => (<Loadable loadablePath='pages/Default' {...props} />)
const Home = (props) => (<Loadable loadablePath='pages/Home' {...props} />)
const About = (props) => (<Loadable loadablePath='pages/About' {...props} />)
const Contact = (props) => (<Loadable loadablePath='pages/Contact' {...props} />)
const ProtectedRoutes = (props) => (<Loadable loadablePath='ProtectedRoutes' {...props} />)

const styles = () => ({
  '@global': {
    '.grecaptcha-badge': {
      visibility: 'hidden'
    }
  }
})

const routesWithBackButton = ['/dashboard/presentation']

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
          <ProtectedRoutes path='/dashboard/*' />
          <ReCaptcha path='/recaptcha' />
        </Router>

      </React.Fragment>
    )
  }
}

export default withRoot(withStyles(styles)(App))
