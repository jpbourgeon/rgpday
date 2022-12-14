import React from 'react'
import { Router, Location } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { loadReCaptcha } from 'recaptcha-v3-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import withRoot from 'src/withRoot'
import Loadable from 'src/components/Loadable'
import Navigation from 'src/components/Navigation'
import ProtectedRoutes from 'src/ProtectedRoutes'

const ReCaptcha = (props) => (<Loadable loadablePath='components/ReCaptcha/GetReCaptchaTokens' {...props} />)
const Default = (props) => (<Loadable loadablePath='pages/Default' {...props} />)
const Home = (props) => (<Loadable loadablePath='pages/Home' {...props} />)
const About = (props) => (<Loadable loadablePath='pages/About' {...props} />)
const Contact = (props) => (<Loadable loadablePath='pages/Contact' {...props} />)

const styles = () => ({
  '@global': {
    '.grecaptcha-badge': {
      visibility: 'hidden'
    }
  }
})

const minified = [/\/dashboard\/presentation/, /\/dashboard\/serious-game/]
const paper = [/\/dashboard\/serious-game/, /\/dashboard\/serious-game\/board\/\d+\/.*\/?$/]
const board = [/\/dashboard\/serious-game\/board\/\d+\/?$/]
const faded = [/\/dashboard\/presentation/]

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      openRules: false
    }
    this.toggleRules = this.toggleRules.bind(this)
  }

  componentDidMount () {
    loadReCaptcha({
      key: '6LedLpMUAAAAAG8Ai4M4x9wTcIs4rPmvYV82a7Yh',
      id: 'rgpday.com'
    })
  }

  toggleRules (status) {
    this.setState({ openRules: status })
  }

  render () {
    return (
      <React.Fragment>

        <CssBaseline />

        <Location>
          {({ location }) => {
            return (
              <Navigation
                minified={minified.some((item) => (location.pathname.match(item)))}
                board={board.some((item) => (location.pathname.match(item)))}
                paper={paper.some((item) => (location.pathname.match(item)))}
                faded={faded.some((item) => (location.pathname.match(item)))}
                location={location}
                toggleRules={this.toggleRules}
              />
            )
          }}
        </Location>

        <Router>
          <Default default />
          <Home path='/' />
          <About path='about' />
          <Contact path='/contact' />
          <ProtectedRoutes path='/dashboard/*' openRules={this.state.openRules} />
          <ReCaptcha path='/recaptcha' />
        </Router>

      </React.Fragment>
    )
  }
}

export default withRoot(withStyles(styles)(App))
